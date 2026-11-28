
import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
}

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
}

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
}

export const onBoardingPatient = async (userData) => {
  const res = await axiosInstance.post("/patient/onboardingPatient", userData);
  return res.data;
}

export const onBoardingDoctor = async (userData) => {
  const res = await axiosInstance.post("/doctor/onboardingDoctor", userData);
  return res.data;
}

export async function getPendingDoctors() {
  const res = await axiosInstance.get("/admin/pending-doctors");
  // console.log(res.data)
  return res.data;
}

export async function approveDoctor(id) {
  const res = await axiosInstance.patch(`/admin/approve-doctor/${id}`);
  return res.data;
}

export async function rejectDoctor(id) {
  const res = await axiosInstance.patch(`/admin/reject-doctor/${id}`);
  return res.data;
}

export async function getDoctorProfile() {
  const res = await axiosInstance.get("/doctor/profile");
  // console.log(res.data)
  return res.data;
}

export async function updateDoctorProfile(data) {
  const res = await axiosInstance.patch("/doctor/profile", data);
  return res.data;
}

export async function getApprovedDoctors() {
  const res = await axiosInstance.get("/doctor/approved");
  return res.data;
}

export async function getDoctorById(id) {
  const res = await axiosInstance.get(`/doctor/${id}`);
  return res.data;
}

export async function bookAppointment(data) {
  const res = await axiosInstance.post("/appointments/book", data);
  return res.data;
}

export async function getDoctorAppointments() {
  const res = await axiosInstance.get("/appointments/doctor");
  return res.data;
}

export async function completeAppointment(id) {
  const res = await axiosInstance.patch(`/appointments/complete/${id}`);
  return res.data;
}

export async function cancelAppointment(id) {
  const res = await axiosInstance.patch(`/appointments/cancel/${id}`);
  return res.data;
}

export async function getPatientAppointments() {
  const res = await axiosInstance.get("/appointments/patient");
  return res.data;

}

export async function getDoctorsByStatus(status) {
  const res = await axiosInstance.get(
    `/admin/doctors?status=${status}`
  );

  return res.data;
}

export async function getAllPatients() {
  const res = await axiosInstance.get("/admin/patients");
  return res.data;
}

export async function getAllAppointments() {
  const res = await axiosInstance.get("/admin/appointments");
  return res.data;
}
