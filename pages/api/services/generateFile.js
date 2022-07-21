const XLSX = require('xlsx');

exports.generateJSONtoXLSX = (jsonFile) => {
    const workSheet = XLSX.utils.json_to_sheet(jsonFile);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "JSONdata");

    //Buffer
    XLSX.write(workBook, {bookType: "xlsx", type:"buffer"});
    XLSX.write(workBook,{bookType: "xlsx", type:"binary"});

    XLSX.writeFile(workBook, "DataPrueba.xlsx");

}

