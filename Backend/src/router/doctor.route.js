
import express from "express";
import { authorizeRoles, protectedRoute } from "../middleware/auth.middleware.js";
import { getApprovedDoctors, getDoctorById, getDoctorProfile, onboardDoctor } from "../controller/doctor.controller.js";



const router = express.Router();

router.post("/onboardingDoctor", protectedRoute, authorizeRoles("DOCTOR"), onboardDoctor);

router.get("/approved", getApprovedDoctors);

router.get("/profile",protectedRoute,authorizeRoles("DOCTOR"),getDoctorProfile);

router.get("/:id", protectedRoute, getDoctorById);

export default router;