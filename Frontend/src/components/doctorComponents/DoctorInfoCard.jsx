
import React from "react";
import {
  UserRound,
  Stethoscope,
  Mail,
  BriefcaseBusiness,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const DoctorInfoCard = ({ doctor }) => {
  const details = [
    {
      label: "Full Name",
      value: doctor?.userId?.name,
      icon: UserRound,
    },
    {
      label: "Specialization",
      value: doctor?.specialization,
      icon: Stethoscope,
    },
    {
      label: "Email Address",
      value: doctor?.userId?.email,
      icon: Mail,
    },
    {
      label: "Experience",
      value: doctor?.experience != null
        ? `${doctor.experience} years`
        : "Not provided",
      icon: BriefcaseBusiness,
    },
    {
      label: "Consultation Fee",
      value: doctor?.fees != null
        ? `₹${doctor.fees}`
        : "Not provided",
      icon: Wallet,
    },
  ];

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300">
      <div className="card-body p-6">
        <h2 className="text-xl font-bold mb-2">
          Doctor Information
        </h2>

        <div className="space-y-5 mt-3">
          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-base-content/50">
                    {item.label}
                  </p>
                  <p className="font-semibold break-words">
                    {item.value || "Not provided"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="divider" />

        <div className="flex items-center gap-2">
          <ShieldCheck className="text-success" size={20} />
          <span className="text-sm font-medium">
            Approval Status:
          </span>
          <span className="badge badge-success badge-outline">
            {doctor?.approvalStatus || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoCard;
