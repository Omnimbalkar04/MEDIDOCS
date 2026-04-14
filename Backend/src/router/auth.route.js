import express from "express";
import { onboard, signup } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", protectedRoute, signup);

router.post("/onboarding", protectedRoute, onboard);

export default router;