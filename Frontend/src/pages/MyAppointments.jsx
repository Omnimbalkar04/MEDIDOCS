
import React, { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  Clock3,
  Stethoscope,
  Search,
  ChevronRight,
  ArrowLeft,
  CalendarCheck,
} from "lucide-react";

import { getPatientAppointments } from "../lib/api";

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patientAppointments"],
    queryFn: getPatientAppointments,
  });

  const appointments = data?.appointments || [];

  const tabs = [
    { label: "All", value: "ALL" },
    { label: "Upcoming", value: "BOOKED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesTab =
        activeTab === "ALL" || appointment.status === activeTab;

      const doctorName =
        appointment.doctorId?.userId?.name || "";

      const matchesSearch = doctorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date.split("T")[0]}T${a.time}`);
      const dateB = new Date(`${b.date.split("T")[0]}T${b.time}`);

      return dateB - dateA;
    });

  const getStatusStyle = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* HEADER */}
        <div>
          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                My Appointments
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Track and manage all your medical appointments.
              </p>
            </div>

            <Link
              to="/doctor/approved"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <CalendarCheck size={18} />
              Book Appointment
            </Link>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total",
              value: appointments.length,
              color: "text-blue-600",
            },
            {
              label: "Upcoming",
              value: appointments.filter(a => a.status === "BOOKED").length,
              color: "text-indigo-600",
            },
            {
              label: "Completed",
              value: appointments.filter(a => a.status === "COMPLETED").length,
              color: "text-emerald-600",
            },
            {
              label: "Cancelled",
              value: appointments.filter(a => a.status === "CANCELLED").length,
              color: "text-rose-600",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className={`mt-2 text-3xl font-bold ${item.color}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* APPOINTMENT LIST */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Appointment History
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your appointments and their current status.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* FILTER TABS */}
          <div className="mt-6 flex gap-2 overflow-x-auto border-b border-slate-100 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="mt-6 space-y-4">

            {isLoading ? (
              <div className="py-16 text-center text-slate-500">
                Loading your appointments...
              </div>
            ) : isError ? (
              <div className="py-16 text-center text-rose-600">
                Unable to load appointments. Please try again.
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center">
                <CalendarDays
                  size={38}
                  className="mx-auto text-slate-300"
                />
                <h3 className="mt-4 font-semibold text-slate-800">
                  No appointments found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try another filter or book an appointment with a doctor.
                </p>
                <Link
                  to="/doctor/approved"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Find a Doctor
                  <ChevronRight size={16} />
                </Link>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Stethoscope size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Dr. {appointment.doctorId?.userId?.name || "Unknown Doctor"}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {appointment.doctorId?.specialization || "Medical Specialist"}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {new Date(appointment.date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock3 size={14} />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                    <Link
                      to={`/appointments/${appointment._id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      Details
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default MyAppointments;
