import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  CalendarDays,
  Clock,
  UserRound,
  Stethoscope,
} from "lucide-react";
import { getAllAppointments } from "../lib/api";

const AppointmentManagement = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminAppointments"],
    queryFn: getAllAppointments,
  });

  const appointments = data?.appointments || [];

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName =
      appointment.patientId?.userId?.name || "";

    const doctorName =
      appointment.doctorId?.userId?.name || "";

    const matchesSearch =
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      doctorName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" || appointment.status === status;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    ALL: appointments.length,
    BOOKED: appointments.filter((a) => a.status === "BOOKED").length,
    COMPLETED: appointments.filter((a) => a.status === "COMPLETED").length,
    CANCELLED: appointments.filter((a) => a.status === "CANCELLED").length,
  };

  const getStatusClass = (value) => {
    switch (value) {
      case "BOOKED":
        return "badge-warning";
      case "COMPLETED":
        return "badge-success";
      case "CANCELLED":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        {error?.response?.data?.message || "Failed to load appointments."}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Appointment Management
        </h1>
        <p className="text-base-content/60 mt-1">
          Monitor all patient appointments across MEDIDOCS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "All", value: "ALL" },
          { label: "Booked", value: "BOOKED" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Cancelled", value: "CANCELLED" },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setStatus(item.value)}
            className={`card border shadow-sm text-left transition ${
              status === item.value
                ? "border-primary bg-primary/5"
                : "border-base-300 bg-base-100"
            }`}
          >
            <div className="card-body p-4">
              <p className="text-sm text-base-content/60">
                {item.label} Appointments
              </p>
              <h2 className="text-2xl font-bold">
                {statusCounts[item.value]}
              </h2>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
        />
        <input
          type="text"
          placeholder="Search patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full pl-10"
        />
      </div>

      {/* Appointment List */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-0">

          <div className="p-5 border-b border-base-300">
            <h2 className="font-semibold text-lg">
              Appointments ({filteredAppointments.length})
            </h2>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 px-4">
              <CalendarDays
                size={40}
                className="mx-auto text-base-content/30 mb-3"
              />
              <p className="font-semibold">No appointments found</p>
              <p className="text-sm text-base-content/60 mt-1">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment._id}>
                      {/* Patient */}
                      <td>
                        <div className="flex items-center gap-2">
                          <UserRound
                            size={18}
                            className="text-primary"
                          />
                          <div>
                            <p className="font-semibold">
                              {appointment.patientId?.userId?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {appointment.patientId?.userId?.email || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Doctor */}
                      <td>
                        <div className="flex items-center gap-2">
                          <Stethoscope
                            size={18}
                            className="text-secondary"
                          />
                          <div>
                            <p className="font-semibold">
                              Dr. {appointment.doctorId?.userId?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {appointment.doctorId?.specialization || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td>
                        <div className="space-y-1">
                          <p className="flex items-center gap-2 text-sm">
                            <CalendarDays size={14} />
                            {appointment.date
                              ? new Date(appointment.date).toLocaleDateString()
                              : "—"}
                          </p>
                          <p className="flex items-center gap-2 text-sm text-base-content/60">
                            <Clock size={14} />
                            {appointment.time || "—"}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge ${getStatusClass(appointment.status)}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;