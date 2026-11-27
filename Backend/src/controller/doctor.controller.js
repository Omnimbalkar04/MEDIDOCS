import Doctor from "../models/Doctor.js";
import User from "../models/User.js";


export async function onboardDoctor(req, res) {
  try{
    const userId = req.user._id;

    const{specialization, experience, fees, availaibility , licenseNumber} = req.body;

    if(!specialization || !experience || !fees || !availaibility || !licenseNumber ){
      return res.status(400).json({ message: "All fields are required",
      missingField: [
        !specialization && "specialization",
        !experience && "experience",
        !fees && "fees",
        !availaibility && "availaibility",
        !licenseNumber && "licenseNumber",
      ].filter(Boolean),
     });
    }

    const existingDoctor = await Doctor.findOne({ userId });

    if(existingDoctor){
       return res.status(201).json({
      message: "Doctor already onboarded" 
    })
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      experience,
      fees,
      availaibility,
      licenseNumber
    })

    const updateDoctor = await User.findByIdAndUpdate(userId, {
      isOnboarded: true,
    }, {new:true})

    if(!updateDoctor){
       return res.status(404).json({ message: "Doctor not founded" });
    }

    res.status(201).json({
      message: "Doctor onboarded successfully", doctor 
    })

  }catch(error){
    console.log("Error in onboardDoctor controller", error);
   return res.status(500).json({ message: "Internal server Error" });
  }
}

export async function getApprovedDoctors(req, res){
 try{
  const doctors = await Doctor.find({
    approvalStatus: "APPROVED"
  }).populate("userId", "name email");

   res.status(200).json({
      success: true,
      count: doctors.length, doctors
    })


 }catch(error){
  console.log("Error in getApprovedDoctors controller", error);
    res.status(500).json({ message: "Internal server Error" });
 }
}

export async function getDoctorProfile(req, res){
  try {
    const doctor = await Doctor.findOne({
      userId: req.user.id,
    }).populate("userId", "name email");

    if(!doctor){
      return res.status(404).json({
        message: "Doctor not found",
      })
    }

    return res.status(200).json({
      success: true,
      doctor,
    })
    
  } catch (error) {
    console.log("Error in getDoctorProfile controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}


export async function getDoctorById(req, res){
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id).populate(
      "userId",
      "name email"
    )

    if(!doctor){
      return res.status(404).json({
        message: "Doctor not found"
      })
    }

    return res.status(200).json({
        success: true,
        doctor
      });

  } catch (error) {
    console.log("Error in getDoctorById controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}



export async function updateDoctorProfile(req, res) {
  try {
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const allowedFields = [
      "specialization",
      "experience",
      "fees",
      "availaibility",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    // Validate specialization
    if (updates.specialization !== undefined) {
      if (
        typeof updates.specialization !== "string" ||
        !updates.specialization.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid specialization",
        });
      }

      updates.specialization = updates.specialization.trim();
    }

    // Validate experience
    if (updates.experience !== undefined) {
      const experience = Number(updates.experience);

      if (!Number.isFinite(experience) || experience < 0) {
        return res.status(400).json({
          success: false,
          message: "Experience must be a valid non-negative number",
        });
      }

      updates.experience = experience;
    }

    // Validate consultation fees
    if (updates.fees !== undefined) {
      const fees = Number(updates.fees);

      if (!Number.isFinite(fees) || fees < 0) {
        return res.status(400).json({
          success: false,
          message: "Consultation fee must be a valid non-negative number",
        });
      }

      updates.fees = fees;
    }

    // Validate availability
    if (updates.availaibility !== undefined) {
      if (
        typeof updates.availaibility !== "string" ||
        !updates.availaibility.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide valid availability information",
        });
      }

      updates.availaibility = updates.availaibility.trim();
    }

    Object.assign(doctor, updates);

    await doctor.save();

    await doctor.populate("userId", "name email");

    return res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor,
    });

  } catch (error) {
    console.log("Error in updateDoctorProfile controller:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
