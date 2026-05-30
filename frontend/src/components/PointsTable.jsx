import { Trophy } from "lucide-react";

function PointsTable({ points }) {
  const sortedPoints = [...points].sort(
    (a, b) => b.points - a.points || b.won - a.won,
  );

  return (
    <div className="table-container">
      <h2 className="section-title">
        <Trophy size={22} />
        Leaderboard
      </h2>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {sortedPoints.map((team, index) => (
            <tr
              key={team.teamName}
              className={
                index === 0
                  ? "rank-1"
                  : index === 1
                    ? "rank-2"
                    : index === 2
                      ? "rank-3"
                      : ""
              }
            >
              <td>
                {index === 0
                  ? "🥇"
                  : index === 1
                    ? "🥈"
                    : index === 2
                      ? "🥉"
                      : index + 1}
              </td>

              <td>{team.teamName}</td>

              <td>{team.played}</td>

              <td>{team.won}</td>

              <td>{team.lost}</td>

              <td>
                <strong>{team.points}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PointsTable;
