import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { cancelAppointment, completeAppointment, getDoctorAppointments } from "../lib/api"


const DoctorAppointments = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["doctorAppointments"],
    queryFn: getDoctorAppointments,
  })

  const { mutate: completeMutation, isPending } = useMutation({
    mutationFn: completeAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctorAppointments"]
      })
    }
  })

  const { mutate: cancelMutation } = useMutation({
    mutationFn: cancelAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["doctorAppointments"]
      })
    }
  })

  if(isLoading) return <h1>Loading....</h1>

  const appointments = data?.appointments || [];
  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">
        My Appointments
      </h1>

      { appointments.map((appointment) => (
        <div key={appointment._id} className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition ">
          <h2 className="text-xl font-semibold">
            {appointment.patientId.userId.name}
          </h2>

          <p className="text-gray-600">{appointment.patientId.userId.email}</p>
          
          <div className="mt-4 flex gap-6 text-gray-700">
          <p>{new Date(appointment.date).toLocaleDateString()}</p>

          <p>{appointment.time}</p>
          </div>

          <span className={`px-3 py-1 rounded-full text-sm font-medium  ${
            appointment.status === "BOOKED" 
            ? "bg-yellow-100 text-yellow-700"
            :appointment.status === "COMPLETED" 
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
          }`}> {appointment.status} </span>

            
     {appointment.status === "BOOKED" ? (
      <div className="flex gap-3">
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400"
     onClick={() => completeMutation(appointment._id)}
     disabled={
       isPending
     }>Complete Appointment</button>

     <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400"
      onClick={() => cancelMutation(appointment._id)}
      disabled={
         isPending
      }>Cancel Appointment</button> 
      </div>
     ) : appointment.status === "COMPLETED" ? (
      <span className="text-green-600 font-semibold">Completed</span>
     ) : (
      <span className="text-red-600 font-semibold">Cancelled</span>
     )}
        </div>
      )) }

   
    </div>
  )
}

export default DoctorAppointments