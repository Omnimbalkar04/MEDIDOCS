import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
   doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
     patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    date:{
      type: Date,
      required: true
    },

    time:String,

    status:{
      type:String,
      enum:["BOOKED", "COMPLETED", "CANCELLED"],
      default: "BOOKED",
    },
    reason:String


}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;