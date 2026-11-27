// import React from 'react'

// const StatsCards = () => {
//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//       <div className="bg-white shadow rounded-xl p-5">
//         <h3 className="text-gray-500">Appointments</h3>
//         <h1 className="text-3xl font-bold">0</h1>
//       </div>

//       <div className="bg-white shadow rounded-xl p-5">
//         <h3 className="text-gray-500">Patients</h3>
//         <h1 className="text-3xl font-bold">0</h1>
//       </div>

//       <div className="bg-white shadow rounded-xl p-5">
//         <h3 className="text-gray-500">Earnings</h3>
//         <h1 className="text-3xl font-bold">0</h1>
//       </div>

//       <div className="bg-white shadow rounded-xl p-5">
//         <h3 className="text-gray-500">Pending</h3>
//         <h1 className="text-3xl font-bold">0</h1>
//       </div>


//     </div>
//   )
// }

// export default StatsCards


import React from "react";
import {
  CalendarDays,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Appointments",
      value: stats?.total ?? 0,
      icon: CalendarDays,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Total Patients",
      value: stats?.patients ?? 0,
      icon: Users,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      title: "Completed",
      value: stats?.completed ?? 0,
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Pending",
      value: stats?.pending ?? 0,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="card bg-base-100 shadow-sm border border-base-300"
          >
            <div className="card-body p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-base-content/60 font-medium">
                  {card.title}
                </p>

                <div className={`p-3 rounded-xl ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
