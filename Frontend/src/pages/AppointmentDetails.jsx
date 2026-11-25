
import React from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Stethoscope,
  UserRound,
  FileText,
  Hash,
  CheckCircle2,
  XCircle,
  CircleDot,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";

import {
  getPatientAppointments,
  cancelAppointment,
} from "../lib/api";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["patientAppointments"],
    queryFn: getPatientAppointments,
  });

  const appointments = data?.appointments || [];

  const appointment = appointments.find(
    (item) => item._id === id
  );

  const cancelMutation = useMutation({
    mutationFn: () => cancelAppointment(id),

    onSuccess: () => {
      toast.success("Appointment cancelled successfully");

      queryClient.invalidateQueries({
        queryKey: ["patientAppointments"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Unable to cancel appointment"
      );
    },
  });

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (confirmed) {
      cancelMutation.mutate();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Loading appointment details...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <AlertCircle size={40} className="text-rose-500" />
        <h2 className="text-lg font-bold text-slate-800">
          Unable to load appointment
        </h2>
        <Link to="/appointments" className="text-blue-600">
          Back to appointments
        </Link>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <CalendarDays size={40} className="text-slate-400" />
        <h2 className="text-xl font-bold text-slate-800">
          Appointment not found
        </h2>
        <p className="text-sm text-slate-500">
          This appointment may not exist or may no longer be available.
        </p>
        <Link
          to="/appointments"
          className="mt-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to My Appointments
        </Link>
      </div>
    );
  }

  const doctorName =
    appointment.doctorId?.userId?.name || "Unknown Doctor";

  const specialization =
    appointment.doctorId?.specialization || "Medical Specialist";

  const isBooked = appointment.status === "BOOKED";

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* BACK NAVIGATION */}
        <Link
          to="/appointments"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to My Appointments
        </Link>

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              APPOINTMENT OVERVIEW
            </p>

            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Appointment Details
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View your appointment information and current status.
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${getStatusStyle(
              appointment.status
            )}`}
          >
            <CircleDot size={15} />
            {appointment.status}
          </span>
        </div>

        {/* MAIN APPOINTMENT BANNER */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <Stethoscope size={32} />
              </div>

              <p className="mt-5 text-sm font-medium text-blue-100">
                YOUR APPOINTMENT WITH
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Dr. {doctorName}
              </h2>

              <p className="mt-1 text-blue-100">
                {specialization}
              </p>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm sm:min-w-64">
              <p className="text-sm text-blue-100">
                Appointment Date
              </p>

              <div className="mt-3 flex items-center gap-3">
                <CalendarDays size={22} />

                <span className="font-semibold">
                  {formatDate(appointment.date)}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Clock3 size={22} />

                <span className="font-semibold">
                  {appointment.time || "Time not specified"}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT CONTENT */}
          <div className="space-y-6 lg:col-span-2">

            {/* APPOINTMENT INFORMATION */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Appointment Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your booking information and visit details.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Hash size={16} />
                    Appointment ID
                  </div>

                  <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                    {appointment._id}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <CalendarDays size={16} />
                    Appointment Date
                  </div>

                  <p className="mt-2 font-semibold text-slate-800">
                    {formatDate(appointment.date)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock3 size={16} />
                    Appointment Time
                  </div>

                  <p className="mt-2 font-semibold text-slate-800">
                    {appointment.time || "Not specified"}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <UserRound size={16} />
                    Doctor
                  </div>

                  <p className="mt-2 font-semibold text-slate-800">
                    Dr. {doctorName}
                  </p>
                </div>

              </div>
            </div>

            {/* REASON */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  Reason for Visit
                </h2>
              </div>

              <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                {appointment.reason || "No reason was provided during booking."}
              </p>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* STATUS TIMELINE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Appointment Status
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-blue-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Appointment Booked
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {appointment.createdAt
                        ? formatDate(appointment.createdAt)
                        : "Booking date unavailable"}
                    </p>
                  </div>
                </div>

                <div className="ml-2.5 h-6 border-l-2 border-dashed border-slate-200" />

                {appointment.status === "COMPLETED" ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={21}
                      className="shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-emerald-700">
                        Appointment Completed
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Visit marked as completed
                      </p>
                    </div>
                  </div>
                ) : appointment.status === "CANCELLED" ? (
                  <div className="flex items-start gap-3">
                    <XCircle
                      size={21}
                      className="shrink-0 text-rose-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-rose-700">
                        Appointment Cancelled
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        This appointment is cancelled
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <CircleDot
                      size={21}
                      className="shrink-0 text-blue-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-blue-700">
                        Upcoming Appointment
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Your appointment is booked
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* ACTIONS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Actions
              </h2>

              {isBooked ? (
                <div className="mt-5 space-y-3">
                  <button
                    onClick={handleCancel}
                    disabled={cancelMutation.isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle size={17} />
                    {cancelMutation.isPending
                      ? "Cancelling..."
                      : "Cancel Appointment"}
                  </button>

                  <p className="text-xs leading-5 text-slate-400">
                    Cancelling this appointment will update its status.
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  No actions are currently available for this appointment.
                </p>
              )}

              <Link
                to="/appointments"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Back to Appointments
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AppointmentDetails;
