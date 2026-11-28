import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Users, User, CalendarDays } from "lucide-react";
import { getAllPatients } from "../lib/api";

const PatientManagement = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminPatients"],
    queryFn: getAllPatients,
  });

  const patients = data?.patients || [];

  const filteredPatients = patients.filter((patient) => {
    const name = patient.userId?.name || "";
    const email = patient.userId?.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        {error?.response?.data?.message || "Failed to load patients."}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Patient Management
        </h1>
        <p className="text-base-content/60 mt-1">
          View and manage registered patients.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Users size={26} />
            </div>
            <div>
              <p className="text-sm text-base-content/60">
                Total Patients
              </p>
              <h2 className="text-2xl font-bold">{patients.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
        />
        <input
          type="text"
          placeholder="Search by patient name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full pl-10"
        />
      </div>

      {/* Patient List */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-0">

          <div className="p-5 border-b border-base-300">
            <h2 className="font-semibold text-lg">
              Registered Patients ({filteredPatients.length})
            </h2>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 px-4">
              <User size={40} className="mx-auto text-base-content/30 mb-3" />
              <p className="font-semibold">
                {search ? "No matching patients found" : "No patients registered yet"}
              </p>
              <p className="text-sm text-base-content/60 mt-1">
                {search
                  ? "Try searching with another name or email."
                  : "Patients will appear here after completing onboarding."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Registered On</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary/10 text-primary rounded-full w-10">
                              <span>
                                {patient.userId?.name?.charAt(0)?.toUpperCase() || "P"}
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="font-semibold">
                              {patient.userId?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {patient.userId?.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>{patient.age ?? "—"}</td>
                      <td>{patient.gender || "—"}</td>
                      <td>
                        <span className="badge badge-outline">
                          {patient.bloodGroup || "—"}
                        </span>
                      </td>

                      <td>
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays size={15} className="text-base-content/50" />
                          {patient.createdAt
                            ? new Date(patient.createdAt).toLocaleDateString()
                            : "—"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PatientManagement;