import { Users, Trophy, IndianRupee, BadgeCheck } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard({ teams }) {
  const totalTournaments = [
    ...new Set(teams.map((team) => team.tournamentName)),
  ].length;

  const paidTeams = teams.filter(
    (team) => team.paymentStatus === "Paid",
  ).length;

  const pendingTeams = teams.length - paidTeams;

  const totalRevenue = paidTeams * 500;

  const chartData = [
    {
      name: "Teams",
      value: teams.length,
    },
    {
      name: "Tournaments",
      value: totalTournaments,
    },
    {
      name: "Paid",
      value: paidTeams,
    },
    {
      name: "Pending",
      value: pendingTeams,
    },
  ];

  const stats = [
    {
      title: "Total Teams",
      value: teams.length,
      icon: <Users size={32} />,
      color: "#3b82f6",
    },
    {
      title: "Tournaments",
      value: totalTournaments,
      icon: <Trophy size={32} />,
      color: "#f59e0b",
    },
    {
      title: "Paid Teams",
      value: paidTeams,
      icon: <BadgeCheck size={32} />,
      color: "#22c55e",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      icon: <IndianRupee size={32} />,
      color: "#a855f7",
    },
  ];

  return (
    <>
      <div className="dashboard">
        {stats.map((item, index) => (
          <div key={index} className="card modern-card">
            <div
              className="card-icon"
              style={{
                backgroundColor: item.color,
              }}
            >
              {item.icon}
            </div>

            <div className="card-content">
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Tournament Analytics</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default Dashboard;
