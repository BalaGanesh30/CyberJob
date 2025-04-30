import express from "express";
import {
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/is-auth", authenticateToken);
router.get("/logout", authenticateToken, logout);

export default router;
