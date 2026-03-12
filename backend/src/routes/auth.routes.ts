import Router from "express";

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
authRouter.post("/signin", (req, res) => {
    res.send("Hello from auth routes/signin");
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
authRouter.post("/signup", (req, res) => {
    res.send("Hello from auth routes/signup");
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

/**
 * @swagger
 * /api/v1/auth/sendotp:
 *   post:
 *     summary: get user's email and send OTP to it 
 *     description: Returns ok otp is sent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             example:
 *                 email: johndoe@example.com
 *     responses:
 *       200:
 *         description: Ok otp is sent
 *       401:
 *         description: request time out 
 */
authRouter.post("/sendotp", (req, res) => {
    res.send("Hello from auth routes/sendotp");
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
 *                 otp: 123456
 *     responses:
 *       200:
 *         description: Ok otp is correct 
 *       401:
 *         description: Invalid otp
 */
authRouter.post("/validateotp", (req, res) => {
    res.send("Hello from auth routes/sendotp");
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
authRouter.post("/resendotp", (req, res) => {
    res.send("Hello from auth routes/resendotp");
});


export default authRouter;
