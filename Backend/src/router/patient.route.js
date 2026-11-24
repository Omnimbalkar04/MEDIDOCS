import express from "express";
import { authorizeRoles, protectedRoute } from "../middleware/auth.middleware.js";
import { onboardPatient } from "../controller/patient.controller.js";


const router = express.Router();

router.post("/onboardingPatient", protectedRoute, authorizeRoles("PATIENT"), onboardPatient);



export default router;