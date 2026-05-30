import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Trophy } from "lucide-react";

import "./App.css";

import Dashboard from "./components/Dashboard";
import TeamForm from "./components/TeamForm";
import SearchBar from "./components/SearchBar";
import TeamTable from "./components/TeamTable";
import FixtureTable from "./components/FixtureTable";
import PointsTable from "./components/PointsTable";
import TournamentForm from "./components/TournamentForm";
import TournamentTable from "./components/TournamentTable";
import ExportExcel from "./components/ExportExcel";
import ExportPDF from "./components/ExportPDF";

function App() {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [points, setPoints] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    contactNumber: "",
    tournamentName: "",
  });

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/registration/all");

      setTeams(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load teams");
    }
  };

  const fetchFixtures = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fixtures/all");

      setFixtures(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load fixtures");
    }
  };

  const fetchPoints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/points");

      setPoints(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load leaderboard");
    }
  };

  const fetchTournaments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tournaments/all");

      setTournaments(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tournaments");
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchFixtures();
    fetchPoints();
    fetchTournaments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/registration/update/${editId}`,
          formData,
        );

        toast.success("Team Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/registration/register",
          formData,
        );

        toast.success("Team Registered Successfully");
      }

      setFormData({
        teamName: "",
        captainName: "",
        contactNumber: "",
        tournamentName: "",
      });

      setEditId(null);

      fetchTeams();
    } catch (error) {
      console.log(error);
      toast.error("Operation Failed");
    }
  };

  const deleteTeam = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/registration/delete/${_id}`,
      );

      toast.success("Team Deleted");
      fetchTeams();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const editTeam = (team) => {
    toast.success("Edit Mode Enabled");

    setEditId(team._id);

    setFormData({
      teamName: team.teamName || "",
      captainName: team.captainName || "",
      contactNumber: team.contactNumber || "",
      tournamentName: team.tournamentName || "",
    });
  };

  const cancelEdit = () => {
    setEditId(null);

    setFormData({
      teamName: "",
      captainName: "",
      contactNumber: "",
      tournamentName: "",
    });
  };

  const markAsPaid = async (_id) => {
    try {
      await axios.put(`http://localhost:5000/api/registration/pay/${_id}`);

      toast.success("Payment Updated");
      fetchTeams();
    } catch (error) {
      console.log(error);
      toast.error("Payment Update Failed");
    }
  };

  const generateFixtures = async () => {
    try {
      await axios.post("http://localhost:5000/api/fixtures/generate");

      toast.success("Fixtures Generated Successfully");

      fetchFixtures();
      fetchPoints();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Generate Fixtures");
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.teamName.toLowerCase().includes(search.toLowerCase()) ||
      team.captainName.toLowerCase().includes(search.toLowerCase()) ||
      team.tournamentName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
        }}
      />

      <div className="container">
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Trophy color="#f59e0b" />
            Tournament Registration System
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "10px",
            }}
          >
            Manage tournaments, teams, fixtures and leaderboard
          </p>
        </div>

        <Dashboard teams={teams} />

        <div className="forms-grid">
          <TournamentForm fetchTournaments={fetchTournaments} />

          <TeamForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editId={editId}
            cancelEdit={cancelEdit}
          />
        </div>

        <TournamentTable tournaments={tournaments} />

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <button className="generate-btn" onClick={generateFixtures}>
            Generate Fixtures
          </button>
        </div>

        <SearchBar search={search} setSearch={setSearch} />

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <ExportExcel teams={filteredTeams} />
        </div>

        <TeamTable
          teams={filteredTeams}
          editTeam={editTeam}
          deleteTeam={deleteTeam}
          markAsPaid={markAsPaid}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <ExportExcel teams={filteredTeams} />

          <ExportPDF teams={filteredTeams} />
        </div>

        <FixtureTable
          fixtures={fixtures}
          fetchFixtures={() => {
            fetchFixtures();
            fetchPoints();
          }}
        />

        <PointsTable points={points} />
      </div>
    </>
  );
}

export default App;
