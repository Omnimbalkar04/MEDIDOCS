import mongoose from "mongoose";

const medicalRecordsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  diagnosis: String,
  prescription: String,
  notes: String,
  visitDate: {
    type: Date,
    default: Date.now
  },
  attachments: [String]
}, {timestamps: true});

const Records = mongoose.Model("Records", medicalRecordsSchema);

export default Records;
