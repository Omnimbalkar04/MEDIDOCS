import Patient from "../models/Patient.js";
import User from "../models/User.js";

export async function onboardPatient(req, res) {
  try{
    const userId = req.user._id;

    const{age, gender, bloodGroup, allergies, chronicDiseases} = req.body;

    if(!age || !gender || !bloodGroup || !allergies || !chronicDiseases){
      return res.status(400).json({ message: "All fields are required",
      missingField: [
        !age && "age",
        !gender && "gender",
        !bloodGroup && "bloodGroup",
        !allergies && "allergies",
        !chronicDiseases && "chronicDiseases",
      ].filter(Boolean),
     });
    }

    const patient = await Patient.create({
      userId,
      age,
      gender,
      bloodGroup,
      allergies,
      chronicDiseases
    })

    const updatePatient = await User.findByIdAndUpdate(userId, {
      isOnboarded: true,
    }, {new:true})

    if(!updatePatient){
       return res.status(404).json({ message: "Patient not founded" });
    }

    res.status(201).json({
      message: "Patient onboarded successfully", patient 
    })

  }catch(error){
    console.log("Error in onboardPatient controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}