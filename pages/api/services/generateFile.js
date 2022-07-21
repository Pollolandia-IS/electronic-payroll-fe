const XLSX = require("xlsx");
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function generateJSONtoXLSX (jsonFile) {
    const workSheet = XLSX.utils.json_to_sheet(jsonFile);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "JSONdata");

    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "DataPrueba.xlsx");
};

export function  generateTabletoPDF (title, columns, data, fileTitle) {
    const pdfDocument = new jsPDF();
    pdfDocument.text(title, 20, 10);
    pdfDocument.autoTable({
        theme: "grid",
        columns: columns.map((col) => ({ ...col, dataKey: col.field })),
        body: data,
    });
    pdfDocument.save(`${fileTitle}.pdf`);
};
