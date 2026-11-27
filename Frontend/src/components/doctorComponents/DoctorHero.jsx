
import React from "react";
import {
  BriefcaseBusiness,
  Wallet,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";

const DoctorHero = ({ doctor }) => {
  const name = doctor.userId?.name || "Doctor";

  return (
    <div className="relative overflow-hidden bg-base-100 rounded-3xl shadow-lg border border-base-300">

      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-primary/10" />

      <div className="relative flex flex-col items-center text-center px-6 py-10">

        {/* Avatar */}
        <div className="avatar placeholder mb-5">
          <div className="w-28 h-28 rounded-full bg-primary text-primary-content ring-4 ring-base-100 shadow-xl">
            <span className="text-5xl font-bold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Doctor Identity */}
        <h1 className="text-3xl md:text-4xl font-bold">
          Dr. {name}
        </h1>

        <div className="flex items-center gap-2 mt-3 text-primary font-medium">
          <Stethoscope size={18} />
          <span>{doctor.specialization}</span>
        </div>

        {/* Approval Status */}
        <div className="badge badge-success gap-2 mt-4 py-3 px-4">
          <BadgeCheck size={16} />
          {doctor.approvalStatus}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-8">

          <div className="bg-base-200/70 rounded-2xl p-4">
            <BriefcaseBusiness className="mx-auto text-primary mb-2" size={23} />

            <p className="text-xl font-bold">
              {doctor.experience}
            </p>

            <p className="text-sm text-base-content/60">
              Years Experience
            </p>
          </div>

          <div className="bg-base-200/70 rounded-2xl p-4">
            <Wallet className="mx-auto text-primary mb-2" size={23} />

            <p className="text-xl font-bold">
              ₹{doctor.fees}
            </p>

            <p className="text-sm text-base-content/60">
              Consultation Fee
            </p>
          </div>

          <div className="bg-base-200/70 rounded-2xl p-4">
            <BadgeCheck className="mx-auto text-success mb-2" size={23} />

            <p className="text-xl font-bold">
              Verified
            </p>

            <p className="text-sm text-base-content/60">
              Doctor Status
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DoctorHero;
