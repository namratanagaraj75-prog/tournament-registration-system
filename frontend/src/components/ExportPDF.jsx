import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ teams }) {
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Tournament Registration Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Team", "Captain", "Contact", "Tournament", "Fee", "Status"]],
      body: teams.map((team) => [
        team.teamName,
        team.captainName,
        team.contactNumber,
        team.tournamentName,
        team.entryFee,
        team.paymentStatus,
      ]),
    });

    doc.save("Tournament_Report.pdf");
  };

  return (
    <button className="generate-btn" onClick={exportPDF}>
      Export PDF
    </button>
  );
}

export default ExportPDF;
