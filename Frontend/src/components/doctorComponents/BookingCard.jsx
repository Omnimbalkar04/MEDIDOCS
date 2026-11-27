
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

import { bookAppointment } from "../../lib/api";

const BookingCard = ({ doctor }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const queryClient = useQueryClient();

  // Predefined appointment slots
  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  // Get today's date in local YYYY-MM-DD format
  const today = (() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  })();

  const bookingMutation = useMutation({
    mutationFn: bookAppointment,

    onSuccess: () => {
      toast.success("Appointment booked successfully!");

      setDate("");
      setTime("");

      queryClient.invalidateQueries({
        queryKey: ["patientAppointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["doctorAppointments"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    },
  });

  const handleBooking = () => {
    if (!date || !time) {
      toast.error("Please select a date and time slot");
      return;
    }

    bookingMutation.mutate({
      doctorId: doctor._id,
      date,
      time,
    });
  };

  return (
    <div className="h-full bg-base-100 border border-base-300 rounded-3xl shadow-lg p-6 md:p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <CalendarDays size={23} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Book Appointment
          </h2>

          <p className="text-sm text-base-content/60">
            Choose your preferred date and time
          </p>
        </div>
      </div>

      {/* Doctor Summary */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/70 mb-7">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Stethoscope size={22} />
        </div>

        <div>
          <p className="font-semibold">
            Dr. {doctor.userId?.name || "Doctor"}
          </p>

          <p className="text-sm text-base-content/60">
            Consultation Fee: ₹{doctor.fees}
          </p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-7">
        <label className="flex items-center gap-2 font-semibold mb-3">
          <CalendarDays size={18} className="text-primary" />
          Select Appointment Date
        </label>

        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime("");
          }}
          className="input input-bordered w-full focus:outline-primary"
        />
      </div>

      {/* Time Slots */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-primary" />

          <h3 className="font-semibold">
            Select a Time Slot
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {slots.map((slot) => {
            const isSelected = time === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={!date || bookingMutation.isPending}
                onClick={() => setTime(slot)}
                className={`
                  relative rounded-xl border p-3 text-sm font-semibold
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-primary text-primary-content border-primary shadow-md"
                      : "bg-base-100 border-base-300 hover:border-primary hover:bg-primary/5"
                  }
                  disabled:opacity-40 disabled:cursor-not-allowed
                `}
              >
                {isSelected && (
                  <CheckCircle2
                    size={15}
                    className="inline mr-1"
                  />
                )}

                {slot}
              </button>
            );
          })}
        </div>

        {!date && (
          <p className="text-xs text-base-content/50 mt-3">
            Please select a date before choosing a time.
          </p>
        )}
      </div>

      {/* Booking Summary */}
      {date && time && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-primary mb-2">
            Your Selection
          </p>

          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Date</span>
            <span className="font-medium">{date}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span className="text-base-content/60">Time</span>
            <span className="font-medium">{time}</span>
          </div>
        </div>
      )}

      {/* Booking Button */}
      <button
        type="button"
        className="btn btn-primary w-full rounded-xl"
        onClick={handleBooking}
        disabled={
          !date ||
          !time ||
          bookingMutation.isPending
        }
      >
        {bookingMutation.isPending ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Booking Appointment...
          </>
        ) : (
          "Confirm Appointment"
        )}
      </button>

      <p className="text-xs text-center text-base-content/50 mt-4">
        Please verify your selected date and time before confirming.
      </p>

    </div>
  );
};

export default BookingCard;
