import DataTable from "./DataTable";
import { useState } from "react";

const PaymentDetailTable = (props) => {
    const columns = [
        {
            field: "employee",
            headerName: "Empleado",
            height: 52,
            width: 180,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
        },
        {
            field: "baseSalary",
            headerName: "Salario Base",
            width: 170,
            align: "left",
            headerAlign: "left",
            disableColumnMenu: true,
            sortable: true,
            renderCell: (cellValues) => {
                return (
                    <div>
                        <span style={{ fontWeight: 700, color: "#1976D2" }}>
                            {Number(cellValues.value)
                                .toFixed(2)
                                .toString()
                                .replace(".", ",")
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            {props.currency == "USD" ? "$" : "¢"}
                        </span>
                        <br />
                        <span style={{ fontWeight: 300 }}>
                            {cellValues.row.type == "hour"
                                ? "por hora"
                                : props.frequency == "Mensual"
                                ? "por mes"
                                : props.frequency == "Quincenal"
                                ? "por quincena"
                                : "por semana"}
                        </span>
                    </div>
                );
            },
        },
        {
            field: "hours",
            headerName: "Horas",
            width: 74,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            sortable: true,
        },
        {
            field: "grossSalary",
            headerName: "Salario Bruto",
            width: 170,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${
                    props.currency == "USD" ? "$" : "¢"
                }`;
            },
        },
        {
            field: "mandatoryDeductions",
            headerName: "Deducciones Obligatorias",
            width: 190,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${
                    props.currency == "USD" ? "$" : "¢"
                }`;
            },
        },
        {
            field: "voluntaryDeductions",
            headerName: "Deducciones Voluntarias",
            width: 190,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${
                    props.currency == "USD" ? "$" : "¢"
                }`;
            },
        },
        {
            field: "netSalary",
            headerName: "Salario Neto",
            width: 173,
            align: "center",
            headerAlign: "center",
            disableColumnMenu: true,
            sortable: true,
            valueFormatter: (params) => {
                return `${Number(params.value)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${
                    props.currency == "USD" ? "$" : "¢"
                }`;
            },
        },
    ];
    return (
        <DataTable
            rows={props.rows}
            columns={columns}
            height={631}
            width={1149}
            density="standard"
        />
    );
};

export default PaymentDetailTable;
