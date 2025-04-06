const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists. Please login instead.',
                success: false,
                code: "USER_EXISTS"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Sign-up successful",
            success: true,
            token,
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (e) {
        console.error("Signup Error:", e);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: process.env.NODE_ENV === 'development' ? e.message : undefined
        });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        const user = await UserModel.findOne({ email }).select('+password'); // <- FIXED
        const errmsg = "Invalid email or password";

        if (!user) {
            return res.status(403).json({
                message: errmsg,
                success: false,
                code: "INVALID_CREDENTIALS"
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: errmsg,
                success: false,
                code: "INVALID_CREDENTIALS"
            });
        }

        const jwtToken = jwt.sign(
            {
                email: user.email,
                _id: user._id,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            name: user.name,
            email,
            expiresIn: 86400
        });
    } catch (e) {
        console.error("Signin Error:", e);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: process.env.NODE_ENV === 'development' ? e.message : undefined
        });
    }
};


module.exports = { signup, signin };