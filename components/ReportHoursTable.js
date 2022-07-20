import DataTable from "./DataTable";

export default function HourTable(props) {
    const columns = [
        {
            field: "project",
            headerName: "Proyecto",
            width: 200,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
        },
        {
            field: "hours",
            headerName: "Horas",
            width: 74,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "date",
            headerName: "Fecha de Reporte",
            width: 143,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "state",
            headerName: "Estado",
            width: 143,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        }
    ];

    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={884}
            width={560}
        />
    );
}
