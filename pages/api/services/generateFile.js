const XLSX = require("xlsx");
import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateJSONtoXLSX(jsonFile, fileTitle) {
    const workSheet = XLSX.utils.json_to_sheet(jsonFile);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "JSONdata");

    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, `${fileTitle}.xlsx`);
}

export function generateTabletoPDF(
    titles,
    columns,
    data,
    fileTitle,
    mail,
    name,
    toMail = false
) {
    const pdfDocument = new jsPDF();
    titles.forEach((title, index) => {
        pdfDocument.text(title, 15, 10 + index * 10);
    });
    pdfDocument.autoTable({
        theme: "grid",
        columns: columns.map((col) => ({ ...col, dataKey: col.field })),
        margin: { top: 50 },
        body: data,
    });
    if (!toMail) {
        pdfDocument.save(`${fileTitle}.pdf`);
    } else {
        //send pdf to api/sendPDF
        const formData = new FormData();
        formData.append("file", pdfDocument.output("blob"), `${fileTitle}.pdf`);
        fetch("/api/sendPDF", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "user-mail": mail,
                "user-name": name,
            },
        });
    }
}
