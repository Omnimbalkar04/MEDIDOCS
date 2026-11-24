import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { BellIcon, HomeIcon, PersonStandingIcon, ShipWheelIcon, Stethoscope, UserIcon } from 'lucide-react';

const Sidebar = () => {
  const {authUser} = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;


  return <aside className="w-64 bg-white border-r border-slate-200 flex flex-col min-h-screen ">

    {/* LOGO */}
    <div className="px-6 h-20 flex items-center border-b border-slate-100">
      <Link to="/" className='flex items-center gap-3' >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
        <Stethoscope className='w-5 h-5 text-white' />
      </div>

      <div >
        <h1 className="text-xl font-bold tracking-tight text-slate-800">MEDI<span className="text-blue-600">DOCS</span></h1>
        <p className="text-[10px] text-slate-400 font-medium tracking-widest">HEALTHCARE</p>
      </div>
      </Link>
    </div>

    {/* USER MINI PROFILE */}
    <div className="mx-4 mt-5 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-sm">
          {authUser?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">
            {authUser?.role?.toLowerCase() || "Patient"}
          </p>
        </div>
      </div>
    </div>

    {/* NAVIGATION */}

    <nav className="flex-1 px-4 mt-6 space-y-2">
      { authUser?.role === "DOCTOR" && (
        <Link to="/doctor/dashboard" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/doctors" ? "btn-active" : ""}`}>
        <PersonStandingIcon className='size-5 text-base-content opacity-70' />
        <span >Doctor</span>
        </Link>
      )}
     
      { authUser?.role != "DOCTOR" && (<Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}>
      <HomeIcon className='size-5 text-base-content opacity-70' />
      <span >Home</span>
      </Link>)}

      <Link to="/" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/me" ? "btn-active" : ""}`}>
      <UserIcon className='size-5 text-base-content opacity-70' />
      <span >My profile</span>
      </Link>

     { authUser?.role === "ADMIN" && (
      <Link to="/admin" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/admin" ? "btn-active" : ""}`}>
      <UserIcon className='size-5 text-base-content opacity-70' />
      <span >Admin Panel</span>
      </Link>
     )
      }

      <Link to="/doctor/approved" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/doctor/approved" ? "btn-active" : ""}`}>
      <BellIcon className='size-5 text-base-content opacity-70' />
      <span >Find Doctors</span>
      </Link>

      {authUser?.role === "DOCTOR" && (<Link to="/appointments/doctor" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/doctor/approved" ? "btn-active" : ""}`}>
      <BellIcon className='size-5 text-base-content opacity-70' />
      <span >MY Appointments</span>
      </Link>)}

    </nav>

    {/* USER PROFILE SECTION */}

    <div className="p-4 border-t border-base-300 mt-auto">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <PersonStandingIcon />
          </div>
        </div>
        <div className='flex-1'>
          <p className="font-semibold">{authUser?.name}</p> 
          <p className="text-xs text-success flex items-center gap-1">
            <span className="size-2 rounded-full bg-success inline-block" />
            Online
          </p>
        </div>
      </div>
    </div>
  </aside>
}

export default Sidebar