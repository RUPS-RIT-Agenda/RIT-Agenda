import express from "express";
import {registerUser, loginUser, logoutUser} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/status', authenticateToken, (req, res) => {
    res.status(200).json({
        message: "User is authenticated",
        user: req.user,
    });
});



export default router;