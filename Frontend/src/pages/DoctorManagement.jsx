
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDoctorsByStatus } from "../lib/api";
import {
  Stethoscope,
  Mail,
  BriefcaseMedical,
  IndianRupee,
} from "lucide-react";

const DoctorManagement = () => {
  const [status, setStatus] = useState("PENDING");

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctors", status],
    queryFn: () => getDoctorsByStatus(status),
  });

  const doctors = data?.doctors || [];

  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Doctor Management
          </h1>
          <p className="text-base-content/60 mt-2">
            Manage doctor applications and approval status.
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-boxed bg-base-200 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`tab ${
                status === tab.value ? "tab-active" : ""
              }`}
              onClick={() => setStatus(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="alert alert-error">
            Failed to load doctors. Please try again.
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && doctors.length === 0 && (
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body items-center text-center py-16">
              <Stethoscope size={42} className="text-base-content/40" />
              <h2 className="text-xl font-bold">
                No {status.toLowerCase()} doctors
              </h2>
              <p className="text-base-content/60">
                There are currently no doctors in this category.
              </p>
            </div>
          </div>
        )}

        {/* Doctor cards */}
        {!isLoading && !isError && doctors.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="card bg-base-100 shadow-md border border-base-300"
              >
                <div className="card-body">

                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h2 className="card-title">
                        {doctor.userId?.name}
                      </h2>
                      <p className="text-sm text-base-content/60">
                        {doctor.userId?.email}
                      </p>
                    </div>

                    <span
                      className={`badge ${
                        status === "APPROVED"
                          ? "badge-success"
                          : status === "REJECTED"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="divider my-1" />

                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                      <BriefcaseMedical size={17} />
                      {doctor.specialization || "Not specified"}
                    </p>

                    <p className="flex items-center gap-2">
                      <Stethoscope size={17} />
                      {doctor.experience} years experience
                    </p>

                    <p className="flex items-center gap-2">
                      <IndianRupee size={17} />
                      {doctor.fees} consultation fees
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorManagement;
