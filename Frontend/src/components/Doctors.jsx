// import { useQuery } from "@tanstack/react-query"
// import { getApprovedDoctors } from "../lib/api"
// import { Link } from "react-router";

// const Doctors = () => {

//   const { data } = useQuery({
//     queryKey: ["approvedDoctors"],
//     queryFn: getApprovedDoctors,
//   })



//   const doctors = data?.doctors || [];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {doctors.map((doctor) => (
//       <div key={doctor._id} className="card bg-base-100 shadow-lg p-5">
//         <h2 className="text-2xl font-bold">
//           Dr. {doctor.userId.name}
//         </h2>

//         <p>Specialization: {doctor.specialization}</p>

//         <p>Experience: {doctor.experience} Years</p>

//         <p>Consultation Fee: ₹{doctor.fees}</p>
        
//         <Link to={`/doctor/${doctor._id}`}>
//         <button className="btn btn-primary mt-4">
//           View Profile
//         </button>
//         </Link>
        
//       </div>
//     ))}
//   </div>
//   )
// }

// export default Doctors


import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApprovedDoctors } from "../lib/api";
import { Link } from "react-router";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("ALL");
  const [sortBy, setSortBy] = useState("DEFAULT");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["approvedDoctors"],
    queryFn: getApprovedDoctors,
  });

  const doctors = data?.doctors || [];

  // Get unique specializations
  const specializations = [
    "ALL",
    ...new Set(
      doctors
        .map((doctor) => doctor.specialization)
        .filter(Boolean)
    ),
  ];

  // Search, filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let result = doctors.filter((doctor) => {
      const name = doctor.userId?.name || "";
      const spec = doctor.specialization || "";

      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        spec.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "ALL" ||
        spec === specialization;

      return matchesSearch && matchesSpecialization;
    });

    if (sortBy === "FEE_LOW") {
      result.sort((a, b) => Number(a.fees) - Number(b.fees));
    }

    if (sortBy === "FEE_HIGH") {
      result.sort((a, b) => Number(b.fees) - Number(a.fees));
    }

    if (sortBy === "EXPERIENCE") {
      result.sort(
        (a, b) => Number(b.experience) - Number(a.experience)
      );
    }

    return result;
  }, [doctors, search, specialization, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSpecialization("ALL");
    setSortBy("DEFAULT");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="h-8 w-64 bg-base-300 rounded animate-pulse mb-4" />
        <div className="h-12 bg-base-300 rounded animate-pulse mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-56 rounded-2xl bg-base-300 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">
          Unable to load doctors
        </h2>
        <p className="text-base-content/60">
          Something went wrong while fetching doctor information.
        </p>
        <button onClick={() => refetch()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            MEDIDOCS Healthcare
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Find Your Doctor
          </h1>

          <p className="text-base-content/60 mt-2">
            Find the right specialist and take the next step
            towards better healthcare.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4 md:p-5 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <div className="md:col-span-1">
              <label className="label font-medium">
                Search doctors
              </label>

              <input
                type="text"
                placeholder="Doctor name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="label font-medium">
                Specialization
              </label>

              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="select select-bordered w-full"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec === "ALL" ? "All Specializations" : spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="label font-medium">
                Sort doctors
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="DEFAULT">Default</option>
                <option value="FEE_LOW">Fee: Low to High</option>
                <option value="FEE_HIGH">Fee: High to Low</option>
                <option value="EXPERIENCE">Most Experienced</option>
              </select>
            </div>

          </div>

          <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
            <p className="text-sm text-base-content/60">
              Showing <span className="font-bold text-base-content">{filteredDoctors.length}</span> doctors
            </p>

            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm text-primary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Doctor Cards */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-base-100 rounded-2xl p-12 text-center border border-base-300">
            <h2 className="text-xl font-bold mb-2">
              No doctors found
            </h2>
            <p className="text-base-content/60 mb-4">
              Try changing your search or filters.
            </p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Doctor Identity */}
                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                    {doctor.userId?.name?.charAt(0)?.toUpperCase() || "D"}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      Dr. {doctor.userId?.name || "Doctor"}
                    </h2>

                    <p className="text-sm text-primary font-medium">
                      {doctor.specialization}
                    </p>
                  </div>

                </div>

                {/* Doctor Information */}
                <div className="space-y-3 border-t border-base-300 pt-4">

                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60 text-sm">
                      Experience
                    </span>
                    <span className="font-semibold">
                      {doctor.experience} Years
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60 text-sm">
                      Consultation Fee
                    </span>
                    <span className="font-bold text-primary">
                      ₹{doctor.fees}
                    </span>
                  </div>

                </div>

                {/* Profile Button */}
                <Link
                  to={`/doctor/${doctor._id}`}
                  className="btn btn-primary w-full mt-6"
                >
                  View Profile
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Doctors;
