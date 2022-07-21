import EmployeeReportModal from "../components/EmployeeReportModal";
import EmployeeReportTable from "../components/EmployeeReportTable";
import Sidebar from "../components/Sidebar";
import jwt from "jsonwebtoken";
import { useState } from "react";
import styles from "../styles/myPays.module.css";
import { MenuItem, Button, TextField } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import Dropdown, { DropdownBox } from "../components/Dropdown";
import DateRangeModal from "../components/DateRangeModal";
import { dateToString } from "../logic/DateTimeHelpers";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const ids = JSON.parse(res._headers.ids);
    const { userData } = jwt.verify(cookies.token, process.env.JWT_SECRET);
    const projects = await prisma.esContratado.findMany({
        where: {
            cedulaEmpleado: ids.id,
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
    // const payments = await prisma.genera.findMany({
    //     where: {
    //         cedulaEmpleado: ids.id,
    //     },
    //     include: {
    //         proyecto: true,
    //         pago: true,
    //     },
    // });
    const payments = await prisma.pago.findMany({
        where: {
            cedulaEmpleado: ids.id,
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
            cedulaEmpleado: ids.id,
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
            projects: JSON.stringify(
                projects.map((project) => project.proyecto)
            ),
            contracts: JSON.stringify(projects),
            employeeTypes,
            payments: JSON.stringify(payItems),
        },
    };
}

const myPays = (props) => {
    const createRows = (projects, contracts, payments) => {
        const rows = [];
        payments.forEach((payment, index) => {
          console.log("sadasd", payment);
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
            });
        });
        return rows;
    };
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
            <EmployeeReportModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
                    rows={createRows(
                        props.projects,
                        JSON.parse(props.contracts),
                        JSON.parse(props.payments)
                    )}
                />
                <Button
                    className={styles.button}
                    variant="outlined"
                    size="large"
                    color="success"
                    endIcon={<SaveOutlined />}
                >
                    Descargar en excel
                </Button>
            </div>
        </>
    );
};

export default myPays;
