

import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import { getDoctorById } from "../lib/api";

import DoctorHero from "../components/doctorComponents/DoctorHero";
import DoctorDetails from "../components/doctorComponents/DoctorDetails";
import BookingCard from "../components/doctorComponents/BookingCard";

const DoctorProfile = () => {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctorById(id),
    enabled: Boolean(id),
  });

  const doctor = data?.doctor;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-base-content/60">
          Loading doctor profile...
        </p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="text-2xl font-bold">
          Unable to load doctor profile
        </h2>

        <p className="text-base-content/60">
          Please check your connection and try again.
        </p>

        <button
          onClick={() => refetch()}
          className="btn btn-primary"
        >
          Try Again
        </button>

        <Link to="/doctor/approved" className="link link-primary">
          Back to Find Doctors
        </Link>
      </div>
    );
  }

  // Doctor not found
  if (!doctor) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="text-2xl font-bold">
          Doctor Not Found
        </h2>

        <p className="text-base-content/60">
          This doctor profile may no longer be available.
        </p>

        <Link to="/doctor/approved" className="btn btn-primary">
          Find Other Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-6 md:px-8 md:py-10">

      <div className="max-w-7xl mx-auto">

        {/* Back Navigation */}
        <Link
          to="/doctor/approved"
          className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors mb-6"
        >
          <span>←</span>
          Back to Find Doctors
        </Link>

        {/* Doctor Hero */}
        <DoctorHero doctor={doctor} />

        {/* Details and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 mt-8 items-stretch">

          <DoctorDetails doctor={doctor} />

          <BookingCard doctor={doctor} />

        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;
