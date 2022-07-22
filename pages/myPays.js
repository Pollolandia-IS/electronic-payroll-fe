import EmployeeReportModal from "../components/EmployeeReportModal";
import EmployeeReportTable from "../components/EmployeeReportTable";
import Sidebar from "../components/Sidebar";
import jwt from "jsonwebtoken";
import { useState } from "react";
import styles from "../styles/MyPays.module.css";
import { MenuItem, Button, TextField } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import Dropdown, { DropdownBox } from "../components/Dropdown";
import DateRangeModal from "../components/DateRangeModal";
import { dateToString } from "../logic/DateTimeHelpers";
import {generateTabletoPDF, generateJSONtoXLSX } from "./api/services/generateFile";
import { prisma } from "/.db";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const { userData } = jwt.verify(cookies.token, process.env.JWT_SECRET);
    const projects = await prisma.esContratado.findMany({
        where: {
            cedulaEmpleado: userData.id,
        },
        include: {
            proyecto: true,
        },
    });
    const employeeTypes = [];
    projects.forEach((contract) => {
        if (!employeeTypes.includes(contract.tipoEmpleado)) {
            employeeTypes.push(contract.tipoEmpleado);
        }
    });
    const payments = await prisma.pago.findMany({
        where: {
            cedulaEmpleado: userData.id,
        },
        include: {
            genera: {
                include: {
                    proyecto: true,
                },
            },
        },
    });
    const generatedPayments = await prisma.genera.findMany({
        where: {
            cedulaEmpleado: userData.id,
        },
        include: {
            proyecto: true,
        },
    });
    const payItems = generatedPayments.map((generatedPayment) => {
        const payment = payments.find((payment) => {
            return payment.fechaPago === generatedPayment.fechaPago;
        });
        return {
            proyecto: {
                nombre: generatedPayment.proyecto.nombre,
            },
            fechaHora: generatedPayment.fechaHora,
            pago: {
                salarioBruto: payment.salarioBruto,
                salarioNeto: payment.salarioNeto,
                deduccionesEmpleado: payment.deduccionesEmpleado,
                deduccionesVoluntarias: payment.deduccionesVoluntarias,
            },
        };
    });

    return {
        props: {
            name: userData.name,
            isEmployer: userData.isEmployer,
            email: userData.email,
            projects: JSON.stringify(
                projects.map((project) => project.proyecto)
            ),
            contracts: JSON.stringify(projects),
            employeeTypes,
            payments: JSON.stringify(payItems),
        },
    };
}

const MyPays = (props) => {
    const handlePDF = (row, sendMail = false) => {
        const titles = [row.project, row.payDate, props.name, row.type];
        const data = [
            {
                field: "Salario Bruto",
                value: `${Number(row.grossSalary)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            {
                field: row.taxes[0].name,
                value: `${Number(row.taxes[0].amount)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            {
                field: row.taxes[1].name,
                value: `${Number(row.taxes[1].amount)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            {
                field: row.taxes[2].name,
                value: `${Number(row.taxes[2].amount)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            {
                field: row.taxes[3].name,
                value: `${Number(row.taxes[3].amount)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            {
                field: "Impuestos totales",
                value: `${Number(row.mandatoryDeductions)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            { field: "", value: "" },
            ...row.donations.map((donation) => {
                return {
                    field: donation.name,
                    value: `${Number(donation.amount)
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
                };
            }),
            {
                field: "Deducciones voluntarias totales",
                value: `${Number(row.voluntaryDeductions)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
            { field: "", value: "" },
            {
                field: "Pago neto",
                value: `${Number(row.netSalary)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${"CRC"}`,
            },
        ];
        generateTabletoPDF(
            titles,
            [
                { title: "Descripcion", field: "field" },
                { title: "Monto", field: "value" },
            ],
            data,
            `Desglose_pago-${props.name}-${row.payDate}`,
            props.email,
            props.name,
            sendMail
        );
    };
    const createRows = (projects, contracts, payments) => {
        const rows = [];
        payments.forEach((payment, index) => {
            rows.push({
                id: index,
                project: payment.proyecto.nombre,
                type: contracts.find(
                    (contract) =>
                        contract.nombreProyecto === payment.proyecto.nombre
                ).tipoEmpleado,
                payDate: dateToString(new Date(payment.fechaHora), "/"),
                grossSalary: payment.pago.salarioBruto,
                mandatoryDeductions: JSON.parse(
                    payment.pago.deduccionesEmpleado
                ).reduce((acc, curr) => acc + curr.amount, 0),
                voluntaryDeductions: JSON.parse(
                    payment.pago.deduccionesVoluntarias
                ).reduce((acc, curr) => acc + curr.amount, 0),
                netSalary: payment.pago.salarioNeto,
                taxes: JSON.parse(payment.pago.deduccionesEmpleado),
                donations: JSON.parse(payment.pago.deduccionesVoluntarias),
            });
        });
        return rows;
    };
    const rows = createRows(
        props.projects,
        JSON.parse(props.contracts),
        JSON.parse(props.payments)
    );
    const xslxData = rows.map((row) => {
        const { id, ...rest } = row;
        return rest;
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateText, setDateText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [selectedProject, setSelectedProject] = useState(
        "Todos los proyectos"
    );
    const [selectedType, setSelectedType] = useState(
        "Todos los tipos de contrato"
    );
    const [projects, setProjects] = useState(JSON.parse(props.projects));
    const [downloadData, setDownloadData] = useState(null);
    return (
        <>
            <Sidebar
                selected={7}
                username={props.name}
                isEmployer={props.isEmployer}
            />
            <DateRangeModal
                isOpen={isOpenDate}
                setIsOpen={setIsOpenDate}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <EmployeeReportModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                download={handlePDF}
                downloadData={downloadData}
            />
            <div className={styles.content}>
                <div className={styles.header}>
                    <Dropdown
                        state={selectedProject}
                        setState={setSelectedProject}
                    >
                        <MenuItem
                            key="Todos los proyectos"
                            value="Todos los proyectos"
                        >
                            Todos los proyectos
                        </MenuItem>
                        {projects.map((project) => (
                            <MenuItem
                                key={project.nombre}
                                value={project.nombre}
                            >
                                {" "}
                                {project.nombre}{" "}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    <Dropdown state={selectedType} setState={setSelectedType}>
                        <MenuItem
                            key="Todos los tipos de contrato"
                            value="Todos los tipos de contrato"
                        >
                            Todos los tipos de contrato
                        </MenuItem>
                        {props.employeeTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {" "}
                                {type}{" "}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    <DropdownBox onClick={() => setIsOpenDate(true)}>
                        <span className={styles.date}>
                            {startDate && endDate
                                ? `${dateToString(
                                      startDate,
                                      "/"
                                  )} - ${dateToString(endDate, "/")}`
                                : "Seleccionar rango de fecha"}
                        </span>
                    </DropdownBox>
                </div>
                <EmployeeReportTable
                    setIsOpen={setIsOpen}
                    rows={rows}
                    name={props.name}
                    setDownloadData={setDownloadData}
                />
                <Button
                    sx={{marginTop: "50px", marginLeft: "950px"}}
                    variant="outlined"
                    size="large"
                    color="success"
                    endIcon={<SaveOutlined />}
                    onClick={() => {
                        generateJSONtoXLSX(
                            xslxData,
                            `Historial_de_pagos-${props.name.replace(" ", "_")}`
                        );
                    }}
                >
                    Descargar en excel
                </Button>
            </div>
        </>
    );
};

export default MyPays;
