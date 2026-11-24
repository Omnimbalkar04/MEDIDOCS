import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { approveDoctor, getPendingDoctors, rejectDoctor } from '../lib/api';

const AdminDashboard = () => {

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pendingDoctors"],
    queryFn: getPendingDoctors,
  })

  const doctors = data?.doctors || [];

  console.log(doctors);

  // console.log("Doctors for render", doctors);
  // console.log( doctors.length);

  const approveMutation = useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({
      queryKey:  ["pendingDoctors"]})
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectDoctor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pendingDoctors"],
      })
    }
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
      <h1 className="text-4xl font-bold mb-8">
        Pending Doctor Appovals
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className=" rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold">
              {doctor.userId?.name}
            </h2>
            <p >{doctor.userId?.email}</p>
            <p >{doctor.specialization}</p>
            <p >{doctor.experience} years</p>

            

            <button className="btn btn-success mt-4" onClick={() => approveMutation.mutate(doctor.userId._id)}>
              Approve
            </button>

            <button className="btn btn-error mt-4" onClick={() => rejectMutation.mutate(doctor.userId._id)}>
              Reject
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default AdminDashboard