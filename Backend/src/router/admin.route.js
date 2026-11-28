import express from "express";
import { authorizeRoles, protectedRoute } from "../middleware/auth.middleware.js";
import { approveDoctor, getPendingDoctors, rejectDoctor, getDoctorsByStatus, getAllPatients, getAllAppointments } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/pending-doctors", protectedRoute, authorizeRoles("ADMIN"), getPendingDoctors);

router.patch("/approve-doctor/:id", protectedRoute, authorizeRoles("ADMIN"), approveDoctor);

router.patch("/reject-doctor/:id", protectedRoute, authorizeRoles("ADMIN"), rejectDoctor);

router.get(
  "/doctors",
  protectedRoute,
  authorizeRoles("ADMIN"),
  getDoctorsByStatus
);

router.get(
  "/patients",
  protectedRoute,
  authorizeRoles("ADMIN"),
  getAllPatients
);

router.get(
  "/appointments",
  protectedRoute,
  authorizeRoles("ADMIN"),
  getAllAppointments
);


export default router;