import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getCurrentUser, logoutUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/logout", logoutUser);

export default router;