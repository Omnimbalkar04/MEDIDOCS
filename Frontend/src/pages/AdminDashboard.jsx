
import React from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  approveDoctor,
  getPendingDoctors,
  rejectDoctor,
} from "../lib/api";

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingDoctors"],
    queryFn: getPendingDoctors,
  });

  const doctors = data?.doctors || [];

  const approveMutation = useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      toast.success("Doctor approved successfully!");
      queryClient.invalidateQueries({
        queryKey: ["pendingDoctors"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Approval failed"
      );
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectDoctor,
    onSuccess: () => {
      toast.success("Doctor rejected successfully!");
      queryClient.invalidateQueries({
        queryKey: ["pendingDoctors"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Rejection failed"
      );
    },
  });

  const isProcessing = (id) =>
    (approveMutation.isPending &&
      approveMutation.variables === id) ||
    (rejectMutation.isPending &&
      rejectMutation.variables === id);

  const handleApprove = (id) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-error">
          Failed to load pending doctors
        </h2>
        <p className="mt-2 text-base-content/60">
          {error?.response?.data?.message ||
            "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Pending Doctor Approvals
          </h1>
          <p className="text-base-content/60 mt-2">
            Review and manage doctor registration requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title">
                Pending Applications
              </div>
              <div className="stat-value text-primary">
                {doctors.length}
              </div>
            </div>
          </div>
        </div>

        {doctors.length === 0 ? (
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body items-center text-center py-16">
              <div className="text-5xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold">
                All caught up!
              </h2>
              <p className="text-base-content/60">
                There are no pending doctor applications.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map((doctor) => {
              const id = doctor.userId?._id;

              return (
                <div
                  key={doctor._id}
                  className="card bg-base-100 shadow-md border border-base-300"
                >
                  <div className="card-body">

                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="card-title text-xl">
                          {doctor.userId?.name}
                        </h2>
                        <p className="text-sm text-base-content/60">
                          {doctor.userId?.email}
                        </p>
                      </div>

                      <span className="badge badge-warning">
                        Pending
                      </span>
                    </div>

                    <div className="divider my-1" />

                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">
                          Specialization:
                        </span>{" "}
                        {doctor.specialization}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Experience:
                        </span>{" "}
                        {doctor.experience} years
                      </p>

                      <p>
                        <span className="font-semibold">
                          Consultation Fees:
                        </span>{" "}
                        ₹{doctor.fees}
                      </p>
                    </div>

                    <div className="card-actions mt-4">
                      <button
                        className="btn btn-success flex-1"
                        disabled={isProcessing(id)}
                        onClick={() => handleApprove(id)}
                      >
                        {approveMutation.isPending &&
                        approveMutation.variables === id
                          ? "Approving..."
                          : "Approve"}
                      </button>

                      <button
                        className="btn btn-error flex-1"
                        disabled={isProcessing(id)}
                        onClick={() => handleReject(id)}
                      >
                        {rejectMutation.isPending &&
                        rejectMutation.variables === id
                          ? "Rejecting..."
                          : "Reject"}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
