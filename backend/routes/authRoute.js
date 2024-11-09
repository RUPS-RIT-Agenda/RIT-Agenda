import express from "express";
import {registerUser, loginUser, logoutUser} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/status', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User is authenticated",
            user: user,
        });
    } catch (error) {
        console.error("Error fetching user data: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;