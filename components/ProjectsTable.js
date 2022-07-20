import DataTable from "./DataTable";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IoTrashSharp } from "react-icons/io5";

const Avatar1 = styled(Avatar)({
    width: `32px`,
    height: `32px`,
});

export default function ProjectsTable(props) {
    const columns = [
        {
            field: "actions",
            headerName: "",
            width: 60,
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
            width: 300,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "tipoEmpleado",
            headerName: "Tipo de Empleado",
            width: 200,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "puesto",
            headerName: "Puesto",
            width: 300,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "fechaInicio",
            headerName: "Fecha de Inicio",
            width: 120,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "fechaFin",
            headerName: "Fecha de Fin",
            width: 120,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
        {
            field: "jornada",
            headerName: "Jornada",
            width: 150,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
        },
    ];

    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={824}
            width={1266}
        />
    );
}
