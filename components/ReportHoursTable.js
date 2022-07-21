import DataTable from "./DataTable";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlineIcon from "@mui/icons-material/CancelOutlined";

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
            renderCell: (params) => {
                if (params.value === "Aprobado") {
                    return "Aprobado";
                } else if (params.value === "Pendiente") {
                    return (
                        <>
                            <Tooltip title="Aprobar" arrow placement="top">
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        props.selectReport(
                                            {
                                                project: params.row.project,
                                                date: params.row.date,
                                            },
                                            "approve"
                                        );
                                    }}
                                >
                                    <CheckCircleOutlineIcon color="success" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Rechazar" arrow placement="top">
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        props.selectReport(
                                            {
                                                project: params.row.project,
                                                date: params.row.date,
                                            },
                                            "reject"
                                        );
                                    }}
                                >
                                    <CancelOutlineIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        </>
                    );
                } else if (params.value === "Rechazado") {
                    return "Rechazado";
                }
            },
        },
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
