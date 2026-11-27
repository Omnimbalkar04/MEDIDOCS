
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../lib/api";

import {
  UserRound,
  Stethoscope,
  BriefcaseBusiness,
  Wallet,
  ShieldCheck,
  Clock,
  Mail,
  BadgeCheck,
  Pencil,
  X,
  Save,
  IdCard,
} from "lucide-react";

const DoctorMyProfile = () => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    fees: "",
    availaibility: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctorProfile"],
    queryFn: getDoctorProfile,
    retry: false,
  });

  const doctor = data?.doctor;

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateDoctorProfile,

    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["doctorProfile"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });

      toast.success(
        response?.message || "Profile updated successfully!"
      );

      setIsEditing(false);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Unable to update profile"
      );
    },
  });

  const handleEdit = () => {
    setFormData({
      specialization: doctor?.specialization || "",
      experience: doctor?.experience ?? "",
      fees: doctor?.fees ?? "",
      availaibility: doctor?.availaibility || "",
    });

    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.specialization.trim() ||
      formData.experience === "" ||
      formData.fees === "" ||
      !formData.availaibility.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (
      Number(formData.experience) < 0 ||
      Number(formData.fees) < 0
    ) {
      toast.error("Experience and fees cannot be negative");
      return;
    }

    updateProfile({
      ...formData,
      experience: Number(formData.experience),
      fees: Number(formData.fees),
    });
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        Loading doctor profile...
      </div>
    );
  }

  if (isError || !doctor) {
    return (
      <div className="p-8 text-center text-error">
        Unable to load your doctor profile.
      </div>
    );
  }

  const details = [
    {
      label: "Full Name",
      value: doctor.userId?.name,
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: doctor.userId?.email,
      icon: Mail,
    },
    {
      label: "Specialization",
      value: doctor.specialization,
      icon: Stethoscope,
    },
    {
      label: "Experience",
      value: `${doctor.experience ?? 0} years`,
      icon: BriefcaseBusiness,
    },
    {
      label: "Consultation Fee",
      value: `₹${doctor.fees ?? 0}`,
      icon: Wallet,
    },
    {
      label: "License Number",
      value: doctor.licenseNumber,
      icon: IdCard,
    },
    {
      label: "Availability",
      value: doctor.availaibility,
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            My Profile
          </h1>
          <p className="text-base-content/60 mt-1">
            Manage your professional information.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="btn btn-primary"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-content p-6 md:p-8 shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl font-bold">
            {doctor.userId?.name?.charAt(0)?.toUpperCase() || "D"}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">
              Dr. {doctor.userId?.name}
            </h2>

            <p className="opacity-80 mt-1">
              {doctor.specialization}
            </p>

            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="badge badge-success gap-1">
                <BadgeCheck size={14} />
                {doctor.approvalStatus}
              </span>

              <span className="badge badge-outline text-white border-white/50">
                {doctor.experience ?? 0} Years Experience
              </span>
            </div>
          </div>
        </div>

        <Stethoscope
          className="absolute -right-5 -bottom-8 opacity-10"
          size={190}
        />
      </div>

      {/* Profile Information */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-5 md:p-7">

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">
                Professional Information
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                Your registered professional details.
              </p>
            </div>

            <ShieldCheck className="text-success" size={26} />
          </div>

          <div className="divider my-1" />

          {!isEditing ? (

            <div className="grid md:grid-cols-2 gap-6 mt-2">
              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-base-content/50">
                        {item.label}
                      </p>

                      <p className="font-semibold break-words mt-1">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          ) : (

            <form onSubmit={handleSubmit} className="space-y-5 mt-3">

              <div className="grid md:grid-cols-2 gap-5">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Specialization
                    </span>
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Experience (Years)
                    </span>
                  </label>

                  <input
                    type="number"
                    name="experience"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Consultation Fee (₹)
                    </span>
                  </label>

                  <input
                    type="number"
                    name="fees"
                    min="0"
                    value={formData.fees}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Availability
                    </span>
                  </label>

                  <textarea
                    name="availaibility"
                    value={formData.availaibility}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    required
                  />
                </div>

              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3">

                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsEditing(false)}
                  disabled={isPending}
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isPending}
                >
                  <Save size={18} />
                  {isPending ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>
          )}
        </div>
      </div>

      {/* Account Status */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body p-5 flex-row items-center justify-between">
          <div>
            <h3 className="font-bold">Account Verification</h3>
            <p className="text-sm text-base-content/60 mt-1">
              Your account approval is managed by the administrator.
            </p>
          </div>

          <span className="badge badge-success badge-outline">
            {doctor.approvalStatus}
          </span>
        </div>
      </div>

    </div>
  );
};

export default DoctorMyProfile;
