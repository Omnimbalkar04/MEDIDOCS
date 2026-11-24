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