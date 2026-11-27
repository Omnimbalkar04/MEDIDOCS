
import React from "react";
import {
  UserRound,
  Stethoscope,
  Mail,
  BriefcaseBusiness,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const DoctorDetails = ({ doctor }) => {
  const details = [
    {
      label: "Full Name",
      value: doctor.userId?.name || "Not available",
      icon: UserRound,
    },
    {
      label: "Specialization",
      value: doctor.specialization || "Not available",
      icon: Stethoscope,
    },
    {
      label: "Email Address",
      value: doctor.userId?.email || "Not available",
      icon: Mail,
    },
    {
      label: "Experience",
      value: `${doctor.experience} Years`,
      icon: BriefcaseBusiness,
    },
    {
      label: "Consultation Fee",
      value: `₹${doctor.fees}`,
      icon: Wallet,
    },
  ];

  return (
    <div className="h-full bg-base-100 border border-base-300 rounded-3xl shadow-lg p-6 md:p-8">

      <div className="flex items-center gap-3 mb-7">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Stethoscope size={23} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Doctor Information
          </h2>
          <p className="text-sm text-base-content/60">
            Professional details and credentials
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-start gap-4 pb-4 border-b border-base-300 last:border-0"
            >
              <div className="p-2.5 rounded-xl bg-base-200 text-primary">
                <Icon size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-base-content/60">
                  {item.label}
                </p>

                <p className="font-semibold mt-1 break-words">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      <div className="mt-6 p-4 rounded-2xl bg-success/10 flex items-center gap-3">
        <ShieldCheck className="text-success shrink-0" size={24} />

        <div>
          <p className="font-semibold text-sm">
            {doctor.approvalStatus}
          </p>
          <p className="text-xs text-base-content/60">
            Doctor approval status
          </p>
        </div>
      </div>

    </div>
  );
};

export default DoctorDetails;
