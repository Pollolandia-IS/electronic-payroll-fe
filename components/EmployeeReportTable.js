import { MailOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DataTable from "./DataTable";
import EmployeeReportModal from "./EmployeeReportModal";

const EmployeeReportTable = (props) => {
    const columns = [
        {
            field: "project",
            headerName: "Proyecto",
            width: 250,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
        },
        {
            field: "type",
            headerName: "Tipo de Contrato",
            width: 130,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
        },
        {
            field: "payDate",
            headerName: "Fecha de Pago",
            width: 130,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
        },
        {
            field: "grossSalary",
            headerName: "Salario Bruto",
            width: 150,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"¢"}`;
            },
        },
        {
            field: "mandatoryDeductions",
            headerName: "Deduc. Obligatorias",
            width: 150,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"¢"}`;
            },
        },
        {
            field: "voluntaryDeductions",
            headerName: "Deduc. Voluntarias",
            width: 150,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"¢"}`;
            },
        },
        {
            field: "netSalary",
            headerName: "Salario Neto",
            width: 150,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"¢"}`;
            },
        },
        {
            field: "mail",
            headerName: "",
            width: 75,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            renderCell: (cellValues) => {
                return (
                    <IconButton
                        color="primary"
                        onClick={() => {
                            props.setDownloadData(cellValues.row);
                            props.setIsOpen(true);
                        }}
                    >
                        <MailOutlined sx={{ fontSize: 28 }} />
                    </IconButton>
                );
            },
            sortable: false,
        },
    ];
    return (
        <>
            <DataTable
                rows={props.rows}
                columns={columns}
                height={728}
                width={1185}
                density="standard"
            />
        </>
    );
};

export default EmployeeReportTable;
