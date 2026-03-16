import Router from "express";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, updateUserPassword, userExists } from "../repositories/user.repo";
import { config } from "../config/config";
import { User } from "../database/models/user.model";
import { generateOTP, sendOTPEmail } from "../utils/otp";
import { redisClient } from "../config/redis";
import { v4 as uuid } from "uuid";

const authRouter = Router();


/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Validate user credentials
 *     description: Returns the user data if the credentials are valid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *                 email: johndoe@example.com
 *                 password: password123
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 name: John Doe
 *                 email: johndoe@example.com
 *               - id: 2
 *                 name: Jane Doe
 *                 email: janedoe@example.com
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/signin", async (req, res) => {
    // parse the request body
    const { email, password } = req.body;

    // validate the fields ( types , min length, max length, etc)
    if (!email || !password) {
        res.status(401).send("Invalid credentials");
        return;
    }

    // check if the user exists
    const user = await getUserByEmail(email);
    if (!user) {
        res.status(401).send("Invalid credentials");
        return;
    }

    // check if the password is correct
    if (user.password !== password) {
        res.status(401).send("Invalid credentials");
        return;
    }

    // generate the jwt token and put it in cookie and send it to the client
    const token = jwt.sign({ userId: user._id }, config.jwt_secret, { expiresIn: "1h" });

    // generate the cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600 * 1000,
    });

    // if everything is ok, return the user data
    res.send({
        userId: user._id,
        username: user.username,
        email: user.email,
    });
});


/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Create a new user 
 *     description: Returns ok and send OTP to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *                 name: John Doe
 *                 email: johndoe@example.com
 *                 password: password123
 *                 address: 123 Main St, Abrag Elmadina
 *                 phone: 0111222333
 *     responses:
 *       200:
 *         description: Ok user data is validated
 *       401:
 *         description: Invalid credentials, bad request, or user already exists
 */
authRouter.post("/signup", async (req, res) => {
    // parse the request body
    const { username, email, password, phone } = req.body;


    // validate the fields ( types , min length, max length, etc)
    if (!username || !email || !password || !phone) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    try {
        // check if the user exists
        const exists = await userExists(email);
        if (exists) {
            res.status(401).send("User already exists");
            return;
        }

        // create the user
        const otp = generateOTP();
        const newUser = {
            username,
            email,
            password,
            phone,
            otp,
            otpSent: false,
            forgotPassword: false,
        };

        console.log(newUser);

        // we need to send otp code to the user's email and save the user in the redis
        // until we verify the otp code
        const sent = await sendOTPEmail(email, otp);
        if (!sent) {
            return res.status(500).json({ message: "Error sending OTP" });
        }

        // save the user in redis
        const redisSession = uuid();
        await redisClient.set(redisSession, JSON.stringify(newUser));
        return res.status(201).json({ message: "OTP sent to user's email", session: redisSession });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving user in redis" });
    }
});

/**
 * @swagger
 * /api/v1/auth/forgotpassword:
 *   post:
 *     summary: restore user's password
 *     description: Returns ok and sends OTP to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *                 email: johndoe@example.com
 *     responses:
 *       200:
 *         description: Ok user exists and OTP is sent
 *       401:
 *         description: user not found
 */
authRouter.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(401).send("Invalid credentials");
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).send("User not found");
        }
        const otp = generateOTP();
        const sent = await sendOTPEmail(email, otp);
        if (!sent) {
            return res.status(500).send("Error sending OTP");
        }
        const userData = {
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            otp: otp,
            otpSent: false,
            forgotPassword: true,
        };

        const redisSession = uuid();
        await redisClient.set(redisSession, JSON.stringify(userData));

        return res.status(200).json({ message: "OTP sent to user's email", session: redisSession });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving user in redis" });
    }
});

authRouter.post("/restorepassword", async (req, res) => {
    const { password, confirmPassword, session } = req.body;
    if (!password || !confirmPassword || !session) {
        return res.status(401).send("Invalid credentials");
    }

    if (password !== confirmPassword) {
        return res.status(401).send("Passwords do not match");
    }

    try {
        const user = await redisClient.get(session);
        if (!user) {
            return res.status(401).send("session not found");
        }



        const userData = JSON.parse(user);

        if (!userData.otpSent) {
            return res.status(401).send("OTP missed");
        }
        const ok = await updateUserPassword(userData.email, password);
        if (!ok) {
            return res.status(401).send("Something went wrong");
        }

        await redisClient.del(session);

        return res.status(200).send("Password changed");
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving user in redis" });
    }
});



/**
 * @swagger
 * /api/v1/auth/validateotp:
 *   post:
 *     summary: Get OTP from body and validate it with the one in the in-memory store 
 *     description: Returns ok user data is validated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *                 email: johndoe@example.com
 *                 otp: 123456
 *     responses:
 *       200:
 *         description: Ok otp is correct 
 *       401:
 *         description: Invalid otp
 */
authRouter.post("/validateotp", async (req, res) => {
    const { session, otp } = req.body;
    try {
        const user = await redisClient.get(session);
        if (!user) {
            return res.status(401).json({ message: "session not found" });
        }
        const userData = JSON.parse(user);
        if (userData.otp !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        if (userData.forgotPassword) {
            userData.otpSent = true;
            await redisClient.set(session, JSON.stringify(userData));
            return res.status(200).json({ message: "OTP is correct" });
        }

        // otp is correct, delete the otp from redis
        const u: Pick<User, "username" | "email" | "password" | "phone"> = {
            username: userData.username, email: userData.email,
            password: userData.password,
            phone: userData.phone,
        }

        await createUser(u);
        return res.status(200).json({ message: "OTP is correct" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error validating OTP" });
    }
});


/**
 * @swagger
 * /api/v1/auth/resendotp:
 *   post:
 *     summary: resend otp to user's email 
 *     description: Returns ok otp is sent again
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *                 email: johndoe@example.com
 *     responses:
 *       200:
 *         description: Ok otp is resent
 */
authRouter.post("/resendotp", async (req, res) => {
    const { session } = req.body;
    try {
        const user = await redisClient.get(session);
        const otp = generateOTP();
        if (!user) {
            return res.status(200).json({ message: "Invalid session" });
        }

        // we are now in the resend case
        const userData = JSON.parse(user);
        userData.otp = otp;

        // send the otp to the user's email
        const sent = await sendOTPEmail(userData.email, otp);
        if (!sent) {
            return res.status(500).json({ message: "Error sending OTP" });
        }

        await redisClient.set(session, JSON.stringify(userData));
        return res.status(200).json({ message: "OTP is resent" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error resending OTP" });
    }
});


export default authRouter;
