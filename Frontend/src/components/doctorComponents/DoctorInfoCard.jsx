import React from 'react'

const DoctorInfoCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Information</h2>
      <div className="space-y-3">
        <p><span className="font-semibold">Name:</span> {doctor?.userId?.name}</p>
        <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
        <p><span className="font-semibold">Email:</span> {doctor?.userId?.email}</p>
        <p><span className="font-semibold">Experience:</span> {doctor?.experience}</p>
        <p><span className="font-semibold">Consultation Fee:</span> {" "} {doctor?.fees}</p>
        <p><span className="font-semibold">Status:</span>{" "} <span className="text-green-600 font-semibold">{doctor?.approvalStatus}</span> </p>
      </div>
    </div>
  )
}

export default DoctorInfoCard