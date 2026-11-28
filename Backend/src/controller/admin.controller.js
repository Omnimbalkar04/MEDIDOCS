import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

export async function getPendingDoctors(req, res) {
  try {
    // const doctors = await User.find({
    //   role: "DOCTOR",
    //   isApproved: false,
    // }).select("-password");

    const doctors = await Doctor.find({
      approvalStatus:"PENDING"
    }).populate("userId", "name email");


    return res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log("Error in getPendingDoctor controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function approveDoctor(req, res) {
  try {
    const { id } = req.params;

    const doctor = await User.findOne({
      _id: id,
      role: "DOCTOR",
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor Not Found",
      });
    }

    await User.findByIdAndUpdate(id, {
      isApproved: true,
    });

    await Doctor.findOneAndUpdate(
      { userId: id },
      { approvalStatus: "APPROVED" }
    );

    return res.status(200).json({
      success: true,
      message: "Doctor approved successfully",
    });

  } catch (error) {
    console.log("Error in approveDoctor controller", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}

// export async function approveDoctor(req, res) {
//   try {
//     const { id } = req.params;
//     const doctor = await User.findById(id);

//     if (!doctor || doctor.role !== "DOCTOR") {
//     return res.status(400).json({ message: "Doctor Not Found" });
//     }

//     doctor.approvalStatus = "APPROVED";
//     await doctor.save();

//     await User.findByIdAndUpdate(id, {
//       isApproved: true,
//     })

//     await Doctor.findOneAndUpdate(
//       { userId: id },
//       { approvalStatus: "APPROVED" }
//     );

//     return res
//       .status(200)
//       .json({ success: true, message: "Doctor approved successfully" });
//   } catch (error) {
//     console.log("Error in approveDoctor controller", error);
//     res.status(500).json({ message: "Internal server Error" });
//   }
// }

export async function rejectDoctor(req, res) {
  try {
    const { id } = req.params;
     

    const doctor = await User.findById(id);



    if (!doctor || doctor.role !== "DOCTOR") {
     return res.status(400).json({ message: "Doctor Not Found" });
    }


    await User.findByIdAndUpdate(id, {
      isApproved: false,
    })
  

    await Doctor.findOneAndUpdate(
      { userId: id },
      { approvalStatus: "REJECTED" }
    );

    return res.status(200).json({ success: true, message: "Doctor rejected" });
  } catch (error) {
    console.log("Error in rejectDoctor controller", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}


export async function getDoctorsByStatus(req, res) {
  try {
    const { status } = req.query;

    const allowedStatuses = [
      "PENDING",
      "APPROVED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid doctor status",
      });
    }

    const doctors = await Doctor.find({
      approvalStatus: status,
    }).populate("userId", "name email");

    return res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {
    console.log("Error in getDoctorsByStatus:", error);

    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}



export async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find()
      .populate("userId", "name email createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: patients.length,
      patients,
    });

  } catch (error) {
    console.log("Error in getAllPatients controller:", error);

    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}


export async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error) {
    console.log("Error in getAllAppointments controller:", error);

    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}