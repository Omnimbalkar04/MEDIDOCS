import React from 'react'
import { getDoctorProfile } from '../lib/api'
import { useQuery } from '@tanstack/react-query'
import DashboardHeader from '../components/doctorComponents/DashboardHeader'
import StatsCards from '../components/doctorComponents/StatsCards'
import DoctorInfoCard from '../components/doctorComponents/DoctorInfoCard'

const DoctorDashboard = () => {

  const {data, isLoading} = useQuery({queryKey: ['doctorProfile'], queryFn: getDoctorProfile, retry: false})

  if(isLoading) return <h1>Loading...</h1>;

  const doctor = data?.doctor;


  return (
    <div className="p-6 space-y-6">
      <DashboardHeader doctor={doctor} />
      <StatsCards />
      <div className="grid lg:grid-cols-2 gap-6">
        <DoctorInfoCard doctor={doctor} />
      </div>
    </div>
  )
}

export default DoctorDashboard