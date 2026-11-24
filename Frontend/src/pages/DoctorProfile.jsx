import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import { getDoctorById } from '../lib/api';
import DoctorHero from '../components/doctorComponents/DoctorHero';
import DoctorDetails from '../components/doctorComponents/DoctorDetails';
import BookingCard from '../components/doctorComponents/BookingCard';

const DoctorProfile = () => {

  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
  })

  const doctor = data?.doctor;

 

if (isLoading) {
  return <div className="flex justify-center items-center h-screen">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
}

  return (
    <div className="max-w-7xl mx-auto p-6">

      <DoctorHero doctor={doctor} />

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <DoctorDetails doctor={doctor} />
        <BookingCard doctor={doctor} />
      </div>
    </div>
  )
}

export default DoctorProfile