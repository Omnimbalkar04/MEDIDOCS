// import React from 'react'
// import { getDoctorProfile } from '../lib/api'
// import { useQuery } from '@tanstack/react-query'
// import DashboardHeader from '../components/doctorComponents/DashboardHeader'
// import StatsCards from '../components/doctorComponents/StatsCards'
// import DoctorInfoCard from '../components/doctorComponents/DoctorInfoCard'

// const DoctorDashboard = () => {

//   const {data, isLoading} = useQuery({queryKey: ['doctorProfile'], queryFn: getDoctorProfile, retry: false})

//   if(isLoading) return <h1>Loading...</h1>;

//   const doctor = data?.doctor;


//   return (
//     <div className="p-6 space-y-6">
//       <DashboardHeader doctor={doctor} />
//       <StatsCards />
//       <div className="grid lg:grid-cols-2 gap-6">
//         <DoctorInfoCard doctor={doctor} />
//       </div>
//     </div>
//   )
// }

// export default DoctorDashboard



import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getDoctorProfile, getDoctorAppointments } from "../lib/api";

import DashboardHeader from "../components/doctorComponents/DashboardHeader";
import StatsCards from "../components/doctorComponents/StatsCards";
import DoctorInfoCard from "../components/doctorComponents/DoctorInfoCard";

const DoctorDashboard = () => {
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
    retry: false,
  });

  const {
    data: appointmentData,
    isLoading: appointmentsLoading,
  } = useQuery({
    queryKey: ["doctorAppointments"],
    queryFn: getDoctorAppointments,
    retry: false,
  });

  if (profileLoading || appointmentsLoading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (profileError || !profileData?.doctor) {
    return (
      <div className="p-8 text-center text-error">
        Unable to load doctor profile.
      </div>
    );
  }

  const doctor = profileData.doctor;

  // Adjust this if your API response uses a different property.
  const appointments = Array.isArray(appointmentData)
    ? appointmentData
    : appointmentData?.appointments || [];

  const stats = {
    total: appointments.length,
    patients: new Set(
      appointments.map((item) => item.patientId?._id).filter(Boolean)
    ).size,
    completed: appointments.filter(
      (item) => item.status === "COMPLETED"
    ).length,
    pending: appointments.filter(
      (item) => item.status === "BOOKED"
    ).length,
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 space-y-6">
      <DashboardHeader doctor={doctor} />

      <StatsCards stats={stats} />

      <div className="grid lg:grid-cols-2 gap-6">
        <DoctorInfoCard doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorDashboard;
