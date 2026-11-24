
import express from "express";
import { authorizeRoles, protectedRoute } from "../middleware/auth.middleware.js";
import { bookAppointment, cancelAppointment, completeAppointment, getDoctorAppointments, getPatientAppointments } from "../controller/appoinment.controller.js";

const router = express.Router();

router.post("/book", protectedRoute, authorizeRoles("PATIENT"), bookAppointment);

router.get("/patient", protectedRoute, authorizeRoles("PATIENT"), getPatientAppointments);

router.get("/doctor", protectedRoute, authorizeRoles("DOCTOR"), getDoctorAppointments);

router.patch("/cancel/:id", protectedRoute, authorizeRoles("DOCTOR"), cancelAppointment);

router.patch("/complete/:id", protectedRoute, authorizeRoles("DOCTOR"), completeAppointment);





export default router;