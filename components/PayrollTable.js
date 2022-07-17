import { HistoryOutlined, PaymentsOutlined } from "@mui/icons-material";
import { Chip, IconButton, Tooltip } from "@mui/material";
import DataTable from "./DataTable";

export default function PayrollTable(props) {
    const columns = [
        {
            field: "projectName",
            headerName: "Nombre del Proyecto",
            width: 250,
            align: "left",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "employeeCount",
            headerName: "Empleados",
            width: 99,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "frequency",
            headerName: "Frecuencia",
            width:90,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "currency",
            headerName: "Moneda",
            width: 92,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "nextPayroll",
            headerName: "Próximo Pago",
            width: 164,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "state",
            headerName: "Estado",
            width: 160,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (cellValues) => {
                if (cellValues.row.state === "Pagado") {
                    return (
                        <Chip label={cellValues.row.state} color="success" variant="outlined" />
                    );
                } else if (cellValues.row.state.startsWith("Pendiente")) {
                    if (cellValues.row.state.split(" ")[1].startsWith("-")) {
                        return (
                            <div style={{display: 'flex', flexDirection: 'column'}} >
                            <Chip label={cellValues.row.state.split(" ")[0]} color="error" variant="outlined" />
                            <p style={{ color: "#D32F2F", fontFamily: "Roboto", fontSize: 14, margin: 0 }}> Atrasado {cellValues.row.state.split("-")[1]} día(s) </p>
                            </div>
                        );
                    } else {
                        return (
                            <div style={{display: 'flex', flexDirection: 'column'}} >
                            <Chip label={cellValues.row.state.split(" ")[0]} color="warning" variant="outlined" />
                            <p style={{ color: "#ED6C02", fontFamily: "Roboto", fontSize: 14, margin: 0 }}> Quedan {cellValues.row.state.split(" ")[1]} día(s) </p>
                            </div>
                        );
                    }
                }

            }
        },
        {
            field: "payAction",
            headerName: "Pago",
            width: 60,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (cellValues) => {
                return (
                    <Tooltip title="Pagar" arrow placement="top">
                        <IconButton color="primary" >
                            <PaymentsOutlined />
                        </IconButton>
                    </Tooltip>
                );
            },
            sortable: false,
        },
        {
            field: "historyAction",
            headerName: "Historial",
            width: 60,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (cellValues) => {
                return (
                    <Tooltip title="Ver Historial" arrow placement="top">
                        <IconButton color="primary" >
                            <HistoryOutlined />
                        </IconButton>
                    </Tooltip>
                );
            },
            sortable: false,
        },
    ];

    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={797}
            width={979}
        />
    );
}