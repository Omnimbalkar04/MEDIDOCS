import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

export async function getPendingDoctors(req, res) {
  try {
    // const doctors = await User.find({
    //   role: "DOCTOR",
    //   isApproved: false,
    // }).select("-password");

    const doctors = await Doctor.find({
      approvalStatus:"PENDING"
    }).populate("userId");

    console.log(doctors);

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
    const doctor = await User.findById(id);

    if (!doctor || doctor.role !== "DOCTOR") {
    return res.status(400).json({ message: "Doctor Not Found" });
    }

    doctor.approvalStatus = "APPROVED";
    await doctor.save();

    await User.findByIdAndUpdate(id, {
      isApproved: true,
    })

    await Doctor.findOneAndUpdate(
      { userId: id },
      { approvalStatus: "APPROVED" }
    );

    return res
      .status(200)
      .json({ success: true, message: "Doctor approved successfully" });
  } catch (error) {
    console.log("Error in approveDoctor controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function rejectDoctor(req, res) {
  try {
    const { id } = req.params;
       console.log("Reject ID:", id);

    const doctor = await User.findById(id);

    console.log("Doctor:", doctor);

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
