import { useState } from "react";
import axios from "axios";
import { Trophy, CalendarDays, IndianRupee } from "lucide-react";

function TournamentForm({ fetchTournaments }) {
  const [formData, setFormData] = useState({
    tournamentName: "",
    entryFee: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tournaments/create",
        formData,
      );

      alert("Tournament Created Successfully");

      setFormData({
        tournamentName: "",
        entryFee: "",
        startDate: "",
        endDate: "",
      });

      fetchTournaments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-title">
        <Trophy size={24} />
        <h2>Create Tournament</h2>
      </div>

      <input
        type="text"
        name="tournamentName"
        placeholder="🏆 Tournament Name"
        value={formData.tournamentName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="entryFee"
        placeholder="💰 Entry Fee"
        value={formData.entryFee}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Tournament</button>
    </form>
  );
}

export default TournamentForm;
