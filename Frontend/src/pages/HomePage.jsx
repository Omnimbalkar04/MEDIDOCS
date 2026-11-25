import React from 'react'
import { Link } from "react-router";
import { CheckCheckIcon, MapPinIcon, Search, UserIcon, UserPlusIcon, Clock3, Calendar, ChevronRight, WalletCards, FileText, Stethoscope, HeartPulse } from "lucide-react";
import { useQuery } from "@tanstack/react-query"
import { getPatientAppointments } from '../lib/api';



const HomePage = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientAppointments"],
    queryFn: getPatientAppointments,
  })

  const appointments = data?.appointments || [];

  const totalAppointments = appointments.length;

  const upcomingAppointments = appointments.filter((appointment) => appointment.status === "BOOKED").sort((a, b) => {
    const dateA = new Date(`${a.date.split("T")[0]}T${a.time}`);
    const dateB = new Date(`${b.date.split("T")[0]}T${b.time}`);

    return dateA - dateB;
  });

  const completedAppointments = appointments.filter((appointment) => appointment.status === "COMPLETED");

  const cancelledAppointments = appointments.filter((appointment) => appointment.status === "CANCELLED");

  const nextAppointment = upcomingAppointments[0];


  console.log("patient dashboard appointments", appointments);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className=" mx-auto mx-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm font-medium text-blue-600">Patient Dashboard</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Good Evening
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Here's your health and appointment overview
          </p>
        </div>

        <Link to="/doctor/approved" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md">
          <Search size={18} />
          Find a Doctor
        </Link>

        {/* UPCOMING APPOINTMENT */}

        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-7">
          <div className="flex flex-col gap-6  lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-100">
                <Calendar size={18} />
                UPCOMING APPOINTMNET
              </div>

              <h2 className="text-2xl font-bold">
                {nextAppointment ? `Dr. ${nextAppointment.doctorId?.userId?.name || "Doctor"}` : "No upcoming appointment"}
              </h2>
              <p className="mt-1 text-blue-100">
                {nextAppointment?.doctorId?.specialization || "Book an appointment with a doctor"}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
                  <Calendar size={16} /> {nextAppointment ? new Date(nextAppointment.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }) : "No date"}
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm">
                  <Clock3 size={16} /> {nextAppointment?.time || "No time"}
                </div>
              </div>
            </div>

            <Link
              to={nextAppointment
                ? `/appointments/${nextAppointment._id}`
                : "/appointments"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              View Appointment
              <ChevronRight size={17} />
            </Link>

          </div>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Calendar size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                TOTAL
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {totalAppointments}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Appointments
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                NEXT
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {upcomingAppointments.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Upcoming Appointment
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <HeartPulse size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                DONE
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {completedAppointments.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Completed Visits
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                <Calendar size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                STATUS
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {cancelledAppointments.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Cancelled
            </p>
          </div>

        </div>


        {/* ================= LOWER SECTION ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* RECENT APPOINTMENTS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Appointments
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest medical visits
                </p>
              </div>

              <Link
                to="/appointments"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            </div>


            <div className="space-y-3">

              {appointments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                  <Calendar size={32} className='mx-auto text-slate-400' />
                  <p className="mt-3 font-semibold text-slate-700">No appointments yet</p>
                  <p className="mt-1 text-sm text-slate-500 ">
                    Book an appointment with one of our approved doctors
                  </p>
                  <Link to="/doctor/approved" className='mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700' >Find a Doctor
                    <ChevronRight size={16} />
                  </Link>
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div

                    key={appointment._id}
                    className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    {/* Doctor */}

                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Stethoscope size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Dr.{" "} {appointment.doctorId?.userId?.name || "Unknown Doctor"}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {appointment.doctorId?.specialization || "Medical Specialist"}
                        </p>
                      </div>

                    </div>

                    {/* Date + Status */}

                    <div className="flex flex-wrap items-center gap-3">

                      <div className="text-sm text-slate-500">
                        {new Date(appointment.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )}
                      </div>

                      {appointment.status === "BOOKED" && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          BOOKED
                        </span>
                      )}

                      {appointment.status === "COMPLETED" && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          COMPLETED
                        </span>
                      )}

                      {appointment.status === "CANCELLED" && (
                        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          CANCELLED
                        </span>
                      )}



                    </div>

                  </div>
                ))

              )}



            </div>
          </div>


          {/* QUICK ACTIONS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your healthcare
              </p>
            </div>


            <div className="space-y-3">

              <Link
                to="/doctor/approved"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Search size={20} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    Find a Doctor
                  </p>

                  <p className="text-xs text-slate-500">
                    Browse available doctors
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1"
                />
              </Link>


              <Link
                to="/appointments"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Calendar size={20} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    My Appointments
                  </p>

                  <p className="text-xs text-slate-500">
                    View your appointments
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1"
                />
              </Link>


              <Link
                to="/medical-records"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <FileText size={20} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    Medical Records
                  </p>

                  <p className="text-xs text-slate-500">
                    View your health records
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1"
                />
              </Link>


              <Link
                to="/billing"
                className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-amber-200 hover:bg-amber-50"
              >
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <WalletCards size={20} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    Billing
                  </p>

                  <p className="text-xs text-slate-500">
                    Manage your payments
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1"
                />
              </Link>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}



export default HomePage


