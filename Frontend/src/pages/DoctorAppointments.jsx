
import React, { useMemo, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  cancelAppointment,
  completeAppointment,
  getDoctorAppointments,
} from "../lib/api";

import {
  CalendarDays,
  Clock,
  UserRound,
  Mail,
  CheckCircle2,
  XCircle,
  Search,
  Stethoscope,
} from "lucide-react";

const DoctorAppointments = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctorAppointments"],
    queryFn: getDoctorAppointments,
  });

  const { mutate: completeMutation, isPending: completing } =
    useMutation({
      mutationFn: completeAppointment,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["doctorAppointments"],
        });
      },
    });

  const { mutate: cancelMutation, isPending: cancelling } =
    useMutation({
      mutationFn: cancelAppointment,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["doctorAppointments"],
        });
      },
    });

  const appointments = data?.appointments || [];

  const stats = {
    total: appointments.length,
    booked: appointments.filter((a) => a.status === "BOOKED").length,
    completed: appointments.filter((a) => a.status === "COMPLETED").length,
    cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const name = appointment.patientId?.userId?.name || "";
      const email = appointment.patientId?.userId?.email || "";

      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading appointments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-error">
        Unable to load appointments. Please try again.
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.total,
      icon: CalendarDays,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Booked",
      value: stats.booked,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-error",
      bg: "bg-error/10",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          My Appointments
        </h1>
        <p className="text-base-content/60 mt-1">
          Manage your patient appointments and consultation schedule.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="card bg-base-100 border border-base-300 shadow-sm"
            >
              <div className="card-body p-4 md:p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-base-content/60">
                    {card.title}
                  </p>

                  <div className={`p-2 rounded-lg ${card.bg}`}>
                    <Icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                </div>

                <h2 className="text-3xl font-bold">
                  {card.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-4">

            <label className="input input-bordered flex items-center gap-2 flex-1">
              <Search size={18} className="opacity-50" />
              <input
                type="text"
                placeholder="Search patient name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow"
              />
            </label>

            <select
              className="select select-bordered w-full md:w-52"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Appointments</option>
              <option value="BOOKED">Booked</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

          </div>
        </div>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Appointment List
          </h2>

          <span className="text-sm text-base-content/60">
            {filteredAppointments.length} results
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body items-center text-center py-12">
              <Stethoscope
                size={42}
                className="text-base-content/30"
              />

              <h3 className="text-lg font-semibold">
                No appointments found
              </h3>

              <p className="text-base-content/60 text-sm">
                Try changing your search or status filter.
              </p>
            </div>
          </div>
        ) : (
          filteredAppointments.map((appointment) => {
            const patient = appointment.patientId?.userId;
            const status = appointment.status;

            return (
              <div
                key={appointment._id}
                className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-5">

                  {/* Patient Information */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <UserRound size={24} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">
                          {patient?.name || "Patient"}
                        </h3>

                        <p className="text-sm text-base-content/60 flex items-center gap-2 mt-1">
                          <Mail size={15} />
                          {patient?.email || "Email unavailable"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`badge badge-lg ${
                        status === "BOOKED"
                          ? "badge-warning"
                          : status === "COMPLETED"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {status}
                    </span>

                  </div>

                  <div className="divider my-1" />

                  {/* Appointment Details */}
                  <div className="grid sm:grid-cols-2 gap-4">

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <CalendarDays size={19} />
                      </div>

                      <div>
                        <p className="text-xs text-base-content/50">
                          Appointment Date
                        </p>
                        <p className="font-medium">
                          {new Date(appointment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-info/10 text-info">
                        <Clock size={19} />
                      </div>

                      <div>
                        <p className="text-xs text-base-content/50">
                          Appointment Time
                        </p>
                        <p className="font-medium">
                          {appointment.time || "Not specified"}
                        </p>
                      </div>
                    </div>

                  </div>

                  {appointment.reason && (
                    <div className="mt-2">
                      <p className="text-xs text-base-content/50">
                        Reason for Visit
                      </p>
                      <p className="text-sm mt-1">
                        {appointment.reason}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {status === "BOOKED" ? (
                    <div className="flex flex-col sm:flex-row gap-3 mt-3">

                      <button
                        className="btn btn-success flex-1"
                        onClick={() => completeMutation(appointment._id)}
                        disabled={completing || cancelling}
                      >
                        <CheckCircle2 size={18} />
                        {completing ? "Processing..." : "Complete Appointment"}
                      </button>

                      <button
                        className="btn btn-error btn-outline flex-1"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to cancel this appointment?")) {
                            cancelMutation(appointment._id);
                          }
                        }}
                        disabled={completing || cancelling}
                      >
                        <XCircle size={18} />
                        {cancelling ? "Processing..." : "Cancel Appointment"}
                      </button>

                    </div>
                  ) : (
                    <p className="text-sm text-base-content/60 mt-2">
                      {status === "COMPLETED"
                        ? "This appointment has been completed."
                        : "This appointment has been cancelled."}
                    </p>
                  )}

                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
};

export default DoctorAppointments;
