import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";


export async function bookAppointment(req, res){
  try {
    const patient = await Patient.findOne({
    userId: req.user._id
});

if (!patient) {
    return res.status(404).json({
        message: "Patient profile not found"
    });
}

    const { doctorId, date, time } = req.body;

    if(!doctorId || !date || !time){
      return res.status(400).json({ message: "All fields required" });
    }

    const doctor = await Doctor.findById(doctorId);

    if(!doctor || doctor.approvalStatus !== "APPROVED"){
      return res.status(400).json({ message: "Doctor not available" });
    }

    const existing = await Appointment.findOne({
      doctorId,
      date,
      time
    });

    if(existing){
      return res.status(400).json({ message: "Slots Already booked" });
    }

    //create appointment

    const appointment = await Appointment.create({
      patientId: patient.id,
      doctorId,
      date,
      time,
      status:"BOOKED"
    })

    res.status(201).json({
      success: true,
      message: "Appointment booked",
      appointment
    })
  } catch (error) {
    console.log("Error in bookAppintment controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function getPatientAppointments(req, res){
  try {
    // const patientId = req.user._id;

    const patient = await Patient.findOne({
      userId: req.user._id
    })

    if(!patient){
      return res.status(404).json({ 
        message: "Patient profile not found"
      });
    }

    const appointments = await Appointment.find({
      patientId: patient._id
    })
    .populate({
      path: "doctorId",
      populate: {
        path: "userId",
        select: "name email"
      }
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    })
  } catch (error) {
     console.log("Error in getPatientAppointments controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function getDoctorAppointments(req, res){
  try {
    const userId = req.user._id;

    const doctor = await Doctor.findOne({ userId });

    if(!doctor){
      return res.status(400).json({ message: "Doctor profile not found" });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id
    }).populate({
      path: "patientId",
      populate: {
        path: "userId",
        select: "name email"
      }
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments
    })
  } catch (error) {
    console.log("Error in getDoctorAppointments controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function cancelAppointment(req, res){
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    const doctor = await Doctor.findOne({ userId: req.user._id });

    if(!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    //security check

    const isPatient = appointment.patientId.toString() === req.user._id.toString();

    const isDoctor = doctor._id.toString() === appointment.doctorId.toString();

    if(!isPatient && !isDoctor){
      return res.status(403).json({ message: "Unauthorized" });
    }


    appointment.status = "CANCELLED";

    await appointment.save();

    return res.status(200).json({ success: true, message: "Appointment cancelled" });

  } catch (error) {
    console.log("Error in cancelAppointment controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function completeAppointment(req, res){
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    
    if(!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "COMPLETED";

    await appointment.save();

    return res.status(200).json({ success: true, message: "appointment completed" });
  } catch (error) {
    console.log("Error in completeAppointment controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}