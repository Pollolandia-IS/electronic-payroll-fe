import DataTable from "./DataTable";
import { Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoPencilSharp } from "react-icons/io5";
import EditIcon from "@mui/icons-material/Edit";

export default function EmployeeTable(props) {
    const columns = [
        {
            field: "actions",
            headerName: "",
            width: 100,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <Avatar variant="circular">
                        {" "}
                        {params.row.name.charAt(0)}{" "}
                    </Avatar>
                );
            },
        },
        {
            field: "name",
            headerName: "Nombre",
            width: 280,
            align: "left",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "cedula",
            headerName: "Cedula",
            width: 110,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "mail",
            headerName: "Correo",
            width: 320,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "phone",
            headerName: "Telefono",
            width: 128,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "projects",
            headerName: "Proyectos",
            width: 120,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "reports",
            headerName: "Reportes Pendientes",
            width: 160,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "edit",
            headerName: "",
            width: 100,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <IconButton color="primary" onClick={() =>
                        props.editEmployeeCompany(params.row.cedula)
                    }> 
                        <EditIcon />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={824}
            width={1336}
        />
    );
}
