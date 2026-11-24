import React from 'react'

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-gray-500">Appointments</h3>
        <h1 className="text-3xl font-bold">0</h1>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-gray-500">Patients</h3>
        <h1 className="text-3xl font-bold">0</h1>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-gray-500">Earnings</h3>
        <h1 className="text-3xl font-bold">0</h1>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-gray-500">Pending</h3>
        <h1 className="text-3xl font-bold">0</h1>
      </div>


    </div>
  )
}

export default StatsCards