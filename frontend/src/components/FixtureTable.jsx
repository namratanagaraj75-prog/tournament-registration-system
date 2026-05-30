import axios from "axios";
import { Swords } from "lucide-react";

function FixtureTable({ fixtures, fetchFixtures }) {
  const selectWinner = async (id, winner) => {
    try {
      await axios.put(`http://localhost:5000/api/fixtures/winner/${id}`, {
        winner,
      });

      fetchFixtures();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container">
      <h2 className="section-title">
        <Swords size={22} />
        Match Fixtures
      </h2>

      <table>
        <thead>
          <tr>
            <th>Team A</th>
            <th>Team B</th>
            <th>Tournament</th>
            <th>Date</th>
            <th>Winner</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {fixtures.map((fixture) => (
            <tr key={fixture._id}>
              <td>{fixture.teamA}</td>

              <td>{fixture.teamB}</td>

              <td>{fixture.tournamentName}</td>

              <td>{fixture.matchDate}</td>

              <td>
                {fixture.winner === "Pending" ? (
                  <span className="status-pending">Pending</span>
                ) : (
                  <span className="status-paid">{fixture.winner}</span>
                )}
              </td>

              <td>
                {fixture.winner === "Pending" ? (
                  <div className="action-buttons">
                    <button
                      className="pay-btn"
                      onClick={() => selectWinner(fixture._id, fixture.teamA)}
                    >
                      {fixture.teamA}
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => selectWinner(fixture._id, fixture.teamB)}
                    >
                      {fixture.teamB}
                    </button>
                  </div>
                ) : (
                  "Completed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FixtureTable;
