import express from "express";
import { authorizeRoles, protectedRoute } from "../middleware/auth.middleware.js";
import { approveDoctor, getPendingDoctors, rejectDoctor } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/pending-doctors", protectedRoute, authorizeRoles("ADMIN"), getPendingDoctors);

router.patch("/approve-doctor/:id", protectedRoute, authorizeRoles("ADMIN"), approveDoctor);

router.patch("/reject-doctor/:id", protectedRoute, authorizeRoles("ADMIN"), rejectDoctor);



export default router;