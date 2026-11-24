import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  specialization:{
    type: String
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
    unique: true,
    sparse: true
  
  },
  availaibility: String,

  approvalStatus:{
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema );

export default Doctor;