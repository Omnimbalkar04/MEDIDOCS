import express from "express";
import { login, signup, logout } from "../controller/auth.controller.js";
import { authorizeRoles, protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login" , login);
router.post("/logout" , logout);

router.get("/admin", protectedRoute, authorizeRoles("ADMIN"), (req, res) => {
  res.send("Admin access");
} )



// check if user is logged in
router.get("/me", protectedRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
})


export default router;