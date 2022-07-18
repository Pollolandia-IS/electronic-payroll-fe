import DataTable from "./DataTable";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoTrashSharp } from "react-icons/io5";

const Avatar1 = styled(Avatar)({
    width: `32px`,
    height: `32px`,
});

export default function EmployeeTable(props) {
    const columns = [
        {
            field: "actions",
            headerName: "",
            width: 100,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            // in this row print <Avatar1 variant="circular" alt={employee.name}/>
            renderCell: (params) => {
                return (
                    <Avatar variant="circular" > {(params.row.name).charAt(0)} </Avatar>
                );
            }
            
        },
        {
            field: "name",
            headerName: "Nombre",
            width:350,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "cedula",
            headerName: "Cedula",
            width:110,
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
            headerName: "Reportes",
            width: 120,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "delete",
            headerName: "",
            width: 100,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <IoTrashSharp size={23} style={{color: "red"}} onClick={() => props.deleteEmployee(params.row.cedula)}/>
                );
            }
        },
    ];

    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={824}
            width={1366}
        />
    );
}
