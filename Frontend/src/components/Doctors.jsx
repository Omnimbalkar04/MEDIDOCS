import { useQuery } from "@tanstack/react-query"
import { getApprovedDoctors } from "../lib/api"
import { Link } from "react-router";

const Doctors = () => {

  const { data } = useQuery({
    queryKey: ["approvedDoctors"],
    queryFn: getApprovedDoctors,
  })



  const doctors = data?.doctors || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {doctors.map((doctor) => (
      <div key={doctor._id} className="card bg-base-100 shadow-lg p-5">
        <h2 className="text-2xl font-bold">
          Dr. {doctor.userId.name}
        </h2>

        <p>Specialization: {doctor.specialization}</p>

        <p>Experience: {doctor.experience} Years</p>

        <p>Consultation Fee: ₹{doctor.fees}</p>
        
        <Link to={`/doctor/${doctor._id}`}>
        <button className="btn btn-primary mt-4">
          View Profile
        </button>
        </Link>
        
      </div>
    ))}
  </div>
  )
}

export default Doctors