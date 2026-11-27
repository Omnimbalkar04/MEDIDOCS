import { Navigate, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";

import { Toaster } from "react-hot-toast";


import useAuthUser from "./hooks/useAuthUser.js";
import OnboardingPatient from "./pages/OnboardingPatient.jsx";
import OnboardingDoctor from "./pages/OnboardingDoctor.jsx";
import PendingApprovalPage from "./pages/PendingApprovalPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import Doctors from "./components/Doctors.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import DoctorAppointments from "./pages/DoctorAppointments.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import AppointmentDetails from "./pages/AppointmentDetails.jsx";
import DoctorMyProfile from "./pages/DoctorMyProfile.jsx";


function App() {

  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen bg-base-200 " >
      <Routes>
        <Route path="/"
          element={
            isAuthenticated && isOnboarded && authUser.role === "PATIENT" && authUser?.isApproved ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" ? !authUser.isApproved ? "/doctor/pending" : "/doctor/dashboard" : authUser.role === "PATIENT" ? "/onboardingPatient" : "/admin"} />
            )
          }
        />
        <Route path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={authUser.role === "DOCTOR" ? !isOnboarded ? "/onboardingDoctor" : !authUser.isApproved ? "/doctor/pending" : "/doctor/dashboard" : authUser.role === "PATIENT" ? !isOnboarded ? "/onboardingPatient" : "/" : "/admin"} />
            )
          } />
        <Route path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={authUser.role === "DOCTOR" ? !isOnboarded ? "/onboardingDoctor" : !authUser.isApproved ? "/doctor/pending" : "/doctor/dashboard" : authUser.role === "PATIENT" ? !isOnboarded ? "/onboardingPatient" : "/" : "/admin"} />
            )
          } />
        <Route path="/onboardingPatient"
          element={
            isAuthenticated ? (
              authUser.role === "PATIENT" ? (
                !isOnboarded ? (
                  <OnboardingPatient />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } />

        <Route path="/onboardingDoctor"
          element={
            isAuthenticated ? (
              authUser.role === "DOCTOR" ? (
                !isOnboarded ? (
                  <OnboardingDoctor />
                ) : (
                  authUser?.isApproved ? (
                    <Navigate to="/doctor/dashboard" />
                  ) : (
                    <Navigate to="/doctor/pending" />
                  )
                )
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } />

        <Route path="/doctor/pending"
          element={
            isAuthenticated && isOnboarded && authUser.role === "DOCTOR" && !authUser?.isApproved ? (
              <Layout showSidebar={true}>
                <PendingApprovalPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" && authUser?.isApproved ? "/doctor/dashboard" : "/onboardingDoctor"} />
            )
          }
        />

        <Route path="/admin"
          element={
            isAuthenticated && authUser.role === "ADMIN" ? (
              <Layout showSidebar={true}>
                <AdminDashboard />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" && authUser?.isApproved ? "/doctor" : "/onboardingDoctor"} />
            )
          }
        />


        <Route path="/doctor/dashboard"
          element={
            isAuthenticated && isOnboarded && authUser.role === "DOCTOR" && authUser?.isApproved ? (
              <Layout showSidebar={true}>
                <DoctorDashboard />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" && !authUser?.isApproved ? "/doctor/pending" : "/onboardingDoctor"} />
            )
          }
        />

        <Route
  path="/doctor/my-profile"
  element={
    isAuthenticated &&
    isOnboarded &&
    authUser.role === "DOCTOR" &&
    authUser.isApproved ? (
      <Layout showSidebar={true}>
        <DoctorMyProfile />
      </Layout>
    ) : (
      <Navigate
        to={
          !isAuthenticated
            ? "/login"
            : authUser.role === "DOCTOR" && !authUser.isApproved
            ? "/doctor/pending"
            : "/onboardingDoctor"
        }
      />
    )
  }
/>

        <Route path="/doctor/approved"
          element={
            isAuthenticated && isOnboarded && authUser ? (
              <Layout showSidebar={true}>
                <Doctors />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" ? !authUser.isApproved ? "/doctor/pending" : "/doctor/dashboard" : authUser.role === "PATIENT" ? "/onboardingPatient" : "/admin"} />
            )
          }
        />

        <Route path="/doctor/:id"
          element={
            isAuthenticated && isOnboarded && authUser?.isApproved ? (
              <Layout showSidebar={true}>
                <DoctorProfile />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" ? !authUser.isApproved ? "/doctor/pending" : "/doctor/dashboard" : authUser.role === "PATIENT" ? "/onboardingPatient" : "/admin"} />
            )
          }
        />

        <Route path="/appointments/doctor"
          element={
            isAuthenticated && isOnboarded && authUser.role === "DOCTOR" && authUser?.isApproved ? (
              <Layout showSidebar={true}>
                <DoctorAppointments />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : authUser.role === "DOCTOR" && !authUser?.isApproved ? "/doctor/pending" : "/onboardingDoctor"} />
            )
          }
        />

        <Route
          path="/appointments"
          element={
            isAuthenticated &&
              isOnboarded &&
              authUser.role === "PATIENT" &&
              authUser?.isApproved ? (
              <Layout showSidebar={true}>
                <MyAppointments />
              </Layout>
            ) : (
              <Navigate
                to={
                  !isAuthenticated
                    ? "/login"
                    : authUser.role === "PATIENT"
                      ? "/onboardingPatient"
                      : authUser.role === "DOCTOR"
                        ? authUser.isApproved
                          ? "/doctor/dashboard"
                          : "/doctor/pending"
                        : "/admin"
                }
              />
            )
          }
        />


        <Route
  path="/appointments/:id"
  element={
    isAuthenticated &&
    isOnboarded &&
    authUser.role === "PATIENT" &&
    authUser?.isApproved ? (
      <Layout showSidebar={true}>
        <AppointmentDetails />
      </Layout>
    ) : (
      <Navigate
        to={
          !isAuthenticated
            ? "/login"
            : authUser.role === "PATIENT"
            ? "/onboardingPatient"
            : authUser.role === "DOCTOR"
            ? authUser.isApproved
              ? "/doctor/dashboard"
              : "/doctor/pending"
            : "/admin"
        }
      />
    )
  }
/>

      </Routes>

      <Toaster />
    </div>
  )
}

export default App
