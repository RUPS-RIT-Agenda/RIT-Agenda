import express from "express";
import {createCustomEvent, getCustomEvents} from "../controllers/customEventController.js";
import {authenticateToken} from "../middleware/auth.js";

const router = express.Router();

router.post('/add', authenticateToken, createCustomEvent);
router.get("/:userId", authenticateToken, getCustomEvents);

export default router;