import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, dateOfBirth, studyCycle, schoolYear, userGroup } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            studyCycle,
            schoolYear,
            userGroup,
        });

        await user.save();

        return res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(200).json({
            message: "Login successful!",
            token,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server Error" });
    }
};