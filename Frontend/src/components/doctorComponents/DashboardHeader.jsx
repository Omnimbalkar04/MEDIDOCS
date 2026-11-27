
import React from "react";
import { Stethoscope, BadgeCheck } from "lucide-react";

const DashboardHeader = ({ doctor }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-content p-6 md:p-8 shadow-lg">
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm opacity-80 mb-3">
          <Stethoscope size={18} />
          <span>Doctor Dashboard</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome, Dr. {doctor?.userId?.name || "Doctor"}
        </h1>

        <p className="mt-2 opacity-80">
          {doctor?.specialization || "Medical Professional"}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <BadgeCheck size={18} />
          <span>
            {doctor?.approvalStatus || "Status unavailable"}
          </span>
        </div>
      </div>

      <Stethoscope
        className="absolute -right-5 -bottom-8 opacity-10"
        size={190}
      />
    </div>
  );
};

export default DashboardHeader;
