import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { onBoardingDoctor } from "../lib/api";
import { LoaderIcon, ShipWheelIcon, TimerIcon } from "lucide-react";

const OnboardingDoctor = () => {

    const { authUser } = useAuthUser();
    const queryClient = useQueryClient();

    const [formState, setFormState] = useState({
        specialization: authUser?.specialization || "",
        experience: authUser?.experience || "",
        fees: authUser?.fees || "",
        availaibility: authUser?.availaibility || "",
        licenseNumber: authUser?.licenseNumber || ""
      });

      const { mutate: onboardingMutation, isPending } = useMutation({
          mutationFn: onBoardingDoctor,
          onSuccess: () => {
            toast.success("Doctor onboarded successfully");
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
            Complete Your Doctor Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* specialization */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">specialization</span>
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formState.specialization}
                  onChange={(e) =>
                    setFormState({ ...formState, specialization: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your specialization"
                />
              </div>

              {/* experience */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">experience</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formState.experience}
                  onChange={(e) =>
                    setFormState({ ...formState, experience: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your experience"
                />
              </div>

              {/* fees */}

             <div className="form-control">
                <label className="label">
                  <span className="label-text">fees</span>
                </label>
                <input
                  type="number"
                  name="fees"
                  value={formState.fees}
                  onChange={(e) =>
                    setFormState({ ...formState, fees: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your fees"
                />
              </div>

              {/* allergies */}
              <div className="form-control">
                <label  className="label">
                  <span className="label-text">availaibility</span>
                </label>

                <div className="relative">
                  <TimerIcon className="absolute top-1/2 tranform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                  <input type="text" name="availaibility" value={formState.availaibility} onChange={(e) => setFormState({ ...formState, availaibility: e.target.value })} className="input input-bordered w-full pl-10" placeholder="availaibility" />
                </div>
              </div>

              {/* licenseNumber */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">licenseNumber</span>
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formState.licenseNumber}
                  onChange={(e) =>
                    setFormState({ ...formState, licenseNumber: e.target.value })
                  }
                  className="input input-bordered w-full"
                  placeholder="Your licenseNumber"
                />
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

export default OnboardingDoctor