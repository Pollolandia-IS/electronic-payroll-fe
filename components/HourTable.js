import DataTable from "./DataTable";

export default function HourTable(props) {
    const columns = [
        {
            field: "hours",
            headerName: "Horas",
            width: 100,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "date",
            headerName: "Fecha de Registro",
            width: 200,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "state",
            headerName: "Estado",
            width: 200,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
    ];

    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={797}
            width={502}
        />
    );
}
