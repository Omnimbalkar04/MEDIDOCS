import React from 'react'

const DoctorHero = ({ doctor }) => {

  return (
    <div className="bg-base-100 shadow-xl rounded-3xl p-8">
      <div className="flex flex-col items-center">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-28">
            <span className="text-5xl">
              {doctor.userId.name.charAt(0)}
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mt-5">
          Dr. {doctor.userId.name}
        </h1>

        <p className="text-lg opacity-70 mt-2">
          {doctor.specialization}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="badge-primary badge-lg">
            {doctor.experience} Years
          </div>

          <div className="badge-secondary badge-lg">
            {doctor.fees}
          </div>

          <div className="badge badge-success badge-lg">
            {doctor.approvalStatus} 
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorHero