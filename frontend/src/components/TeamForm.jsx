import { Users } from "lucide-react";

function TeamForm({
  formData,
  handleChange,
  handleSubmit,
  editId,
  cancelEdit,
}) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-title">
        <Users size={24} />
        <h2>{editId ? "Update Team Registration" : "Register New Team"}</h2>
      </div>

      <input
        type="text"
        name="teamName"
        placeholder="👥 Team Name"
        value={formData.teamName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="captainName"
        placeholder="🧑 Captain Name"
        value={formData.captainName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="contactNumber"
        placeholder="📞 Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="tournamentName"
        placeholder="🏆 Tournament Name"
        value={formData.tournamentName}
        onChange={handleChange}
        required
      />

      <button type="submit">{editId ? "Update Team" : "Register Team"}</button>

      {editId && (
        <button
          type="button"
          onClick={cancelEdit}
          style={{
            background: "#475569",
          }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}

export default TeamForm;
