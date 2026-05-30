import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportExcel({ teams }) {
  const exportToExcel = () => {
    const data = teams.map((team) => ({
      Team: team.teamName,
      Captain: team.captainName,
      Contact: team.contactNumber,
      Tournament: team.tournamentName,
      Fee: team.entryFee,
      Status: team.paymentStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "Tournament_Registrations.xlsx");
  };

  return (
    <button className="generate-btn" onClick={exportToExcel}>
      Export Excel
    </button>
  );
}

export default ExportExcel;
