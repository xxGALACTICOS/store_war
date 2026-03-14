import Router from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail, userExists } from "../repositories/user.repo";
import { config } from "../config/config";
import { User } from "../database/models/user.model";
import { generateOTP, sendOTPEmail } from "../utils/otp";
import { redisClient } from "../config/redis";

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
        res.status(401).send("Invalid credentials");
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
        };

        console.log(newUser);

        // we need to send otp code to the user's email and save the user in the redis
        // until we verify the otp code
        const sent = await sendOTPEmail(email, otp);
        if (!sent) {
            return res.sendStatus(500).json({ message: "Error sending OTP" });
        }

        // save the user in redis
        await redisClient.set(email, JSON.stringify(newUser));
        return res.sendStatus(200).json({ message: "OTP sent to user's email" });
    } catch (err) {
        console.log(err);
        return res.sendStatus(500).json({ message: "Error saving user in redis" });
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
authRouter.post("/forgotpassword", (req, res) => {
    res.send("Hello from auth routes/forgot-password");
});

// /**
//  * @swagger
//  * /api/v1/auth/sendotp:
//  *   post:
//  *     summary: get user's email and send OTP to it 
//  *     description: Returns ok otp is sent
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *             example:
//  *                 email: johndoe@example.com
//  *     responses:
//  *       200:
//  *         description: Ok otp is sent
//  *       401:
//  *         description: request time out 
//  */
// authRouter.post("/sendotp", (req, res) => {
//
// });

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
    const { email, otp } = req.body;
    try {
        const user = await redisClient.get(email);
        if (!user) {
            return res.sendStatus(401).json({ message: "User not found" });
        }
        const userData = JSON.parse(user);
        if (userData.otp !== otp) {
            return res.sendStatus(401).json({ message: "Invalid OTP" });
        }
        return res.sendStatus(200).json({ message: "OTP is correct" });

    } catch (err) {
        console.log(err);
        return res.sendStatus(500).json({ message: "Error validating OTP" });
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
    const { email } = req.body;
    a
});


export default authRouter;
