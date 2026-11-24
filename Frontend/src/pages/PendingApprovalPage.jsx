import React from 'react'
import useAuthUser from '../hooks/useAuthUser'


const PendingApprovalPage = () => {
  const {authUser} = useAuthUser();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="card w-[500px] bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h1 className="text-3xl font-bold text-primary">
              {authUser.name} Your Profile is Under Review
            </h1>

            <p className="text-base-content/70 mt-4">
            Your doctor profile has been submitted successfully
            </p>

            <p className="text-base-content/70">
            Please wait for admin approval to access dashboard
            </p>

            <div className="mt-6">
              <span className="badge badge-warning badge-lg">
                Pending Approval
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingApprovalPage