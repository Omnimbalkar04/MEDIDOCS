import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },
  amount: Number,
  paymentStatus:{
    type: String,
    enum:["PENDING","PAID"],
    default: "PENDING"
  },
  paymentMethod: String
},{timestamps:true});

const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
