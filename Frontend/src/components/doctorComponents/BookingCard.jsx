import React, { useState } from 'react'
import { bookAppointment } from '../../lib/api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const BookingCard = ({ doctor }) => {

   const [date, setDate] = useState("");
    const [time, setTime] = useState("");
  
   const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
   ]

   const bookingMutation = useMutation({
    mutationFn: bookAppointment,

    onSuccess: () => {
      toast.success("Appointment Booked Successfully!");
      setDate("");
      setTime("");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Booking Failed");
    }
   });

   const handleBooking = () => {
    if(!date || !time) {
      return toast.error("Please select date and time");
    }

    bookingMutation.mutate({
      doctorId: doctor._id,
      date,
      time
    })
   }



  return (

    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">

        <h2 className="card-title">
          Book Appointment
        </h2>

        <div className="mt-4">
          <label className="label">
            <span className="label-text">Select Date</span>
          </label>

          <input
            type="date"
            className="input input-bordered w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">
            Available Time Slots
          </h3>

          <div className="grid grid-cols-2 gap-3">

            {slots.map((slot) => (
              <button
                key={slot}
                className={`btn ${
                  time === slot
                    ? "btn-primary"
                    : "btn-outline"
                }`}
                onClick={() => setTime(slot)}
              >
                {slot}
              </button>
            ))}

          </div>
        </div>

        <button
          className="btn btn-primary mt-8 w-full"
          onClick={handleBooking}
          disabled={bookingMutation.isPending}
        >
          {bookingMutation.isPending
            ? "Booking..."
            : "Book Appointment"}
        </button>

      </div>
    </div>
  )
}

export default BookingCard