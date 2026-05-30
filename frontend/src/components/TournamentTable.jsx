import { Trophy } from "lucide-react";

function TournamentTable({ tournaments }) {
  return (
    <div className="table-container">
      <h2 className="section-title">
        <Trophy size={22} />
        Tournaments
      </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Entry Fee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament._id}>
              <td>{tournament.tournamentName}</td>

              <td>₹{tournament.entryFee}</td>

              <td>{tournament.startDate}</td>

              <td>{tournament.endDate}</td>

              <td>
                <span
                  className={
                    tournament.status === "Active"
                      ? "status-paid"
                      : "status-pending"
                  }
                >
                  {tournament.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TournamentTable;
