import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  specialization:{
    type: String,
    required: true
  },
  experience:{
    type: Number,
    default: 0
  },

  fees: {
    type: Number,
    default: 0
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  availaibility: [
    {
      day: String,
      startTime: String,
      endTime: String
    }
  ],
  isApproved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Doctor = mongoose.Model("Doctor", doctorSchema );

export default Doctor;