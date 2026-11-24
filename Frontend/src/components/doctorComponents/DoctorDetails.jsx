import React from 'react'

const DoctorDetails = ({ doctor }) => {

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Doctor Information
        </h2>

        <div className="space-y-3 mt-4">
          <p>
            <strong>Name:</strong>
            {doctor.userId.name}
          </p>

          <p>
            <strong>Specialization:</strong>
            {doctor.specialization}
          </p>

          <p>
            <strong>Email:</strong>
            {doctor.userId.email}
          </p>

          <p>
            <strong>Experience:</strong>
            {doctor.experience} Years
          </p>

          <p>
            <strong>Consultation Fee:</strong>
            {doctor.fees}
          </p>

          <p>
            <strong>Status:</strong>
            <span className="text-success ml-2">{doctor.approvalStatus}</span>
            
          </p>

        </div>
      </div>
    </div>
  )
}

export default DoctorDetails