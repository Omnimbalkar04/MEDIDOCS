import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onBoardingPatient } from "../lib/api";
import toast from "react-hot-toast";
import { HospitalIcon, LoaderIcon, ShipWheelIcon, VenetianMask } from "lucide-react";


const OnboardingPatient = () => {

  
   const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    name: authUser?.name || "",
    age: authUser?.age || "",
    gender: authUser?.gender || "",
    bloodGroup: authUser?.bloodGroup || "",
    allergies: authUser?.allergies || [""],
    chronicDiseases: authUser?.chronicDiseases || [""]
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: onBoardingPatient,
    onSuccess: () => {
      toast.success("Patient onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-md">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* FULL NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your name"
                />
              </div>

              {/* age */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">age</span>
                </label>
                <input
                  type="text"
                  name="age"
                  value={formState.age}
                  onChange={(e) =>
                    setFormState({ ...formState, age: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your age"
                />
              </div>


              {/* gender */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  
                  name="gender"
                  value={formState.gender}
                  onChange={(e) =>
                    setFormState({ ...formState, gender: e.target.value })
                  }
                  className="w-full border p-3 mb-4 rounded"
                  placeholder="Gender"
                >
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* bloodGroup */}

             <div className="form-control">
                <label className="label">
                  <span className="label-text">bloodGroup</span>
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formState.bloodGroup}
                  onChange={(e) =>
                    setFormState({ ...formState, bloodGroup: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your bloodGroup"
                />
              </div>

              {/* allergies */}
              <div className="form-control">
                <label  className="label">
                  <span className="label-text">allergies</span>
                </label>

                <div className="relative">
                  <VenetianMask className="absolute top-1/2 tranform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                  <input type="text" name="location" value={formState.allergies} onChange={(e) => setFormState({ ...formState, allergies: e.target.value })} className="input input-bordered w-full pl-10" placeholder="allergies" />
                </div>
              </div>

              {/* chronicDiseases */}
              <div className="form-control">
                <label  className="label">
                  <span className="label-text">chronicDiseases</span>
                </label>

                <div className="relative">
                  <HospitalIcon className="absolute top-1/2 tranform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                  <input type="text" name="location" value={formState.chronicDiseases} onChange={(e) => setFormState({ ...formState, chronicDiseases: e.target.value })} className="input input-bordered w-full pl-10" placeholder="chronicDiseases" />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button className="btn btn-primary w-full" disabled={isPending} type="submit" >
                {!isPending ? (
                  <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                  </>
                ) : (
                  <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                  </>
                )}
              </button>

          </form>
        </div>
      </div>
    </div>
  )
} 

export default OnboardingPatient