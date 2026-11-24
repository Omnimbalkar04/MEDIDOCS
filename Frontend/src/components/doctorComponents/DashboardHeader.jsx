import React from 'react'

const DashboardHeader = ({ doctor }) => {

  return (
   <div className="bg-white rounded-xl shadow-md p-6">
     <h2 className="text-3xl font-bold">Welcome Dr. {doctor?.userId?.name}</h2>
     <p className="text-gray-500 mt-2">{doctor.specialization}</p>
   </div>
  )
}

export default DashboardHeader