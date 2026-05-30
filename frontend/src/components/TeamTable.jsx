import { Pencil, Trash2, CheckCircle, Users } from "lucide-react";

function TeamTable({ teams, editTeam, deleteTeam, markAsPaid }) {
  return (
    <div className="table-container">
      <h2 className="section-title">
        <Users size={24} />
        Registered Teams
      </h2>

      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Captain</th>
            <th>Contact</th>
            <th>Tournament</th>
            <th>Fee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.teamName}</td>
              <td>{team.captainName}</td>
              <td>{team.contactNumber}</td>
              <td>{team.tournamentName}</td>
              <td>₹{team.entryFee}</td>

              <td>
                {team.paymentStatus === "Paid" ? (
                  <span className="status-paid">✅ Paid</span>
                ) : (
                  <span className="status-pending">⏳ Pending</span>
                )}
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editTeam(team)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  {team.paymentStatus !== "Paid" && (
                    <button
                      type="button"
                      className="pay-btn"
                      onClick={() => markAsPaid(team._id)}
                    >
                      <CheckCircle size={16} />
                      Paid
                    </button>
                  )}

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTeam(team._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;
