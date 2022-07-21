import PaymentDetailTable from "../components/PaymentDetailTable";
import Sidebar from "../components/Sidebar";
import styles from "../styles/payDetail.module.css";
import { Alert, AlertTitle, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import jwt from "jsonwebtoken";
import { createLocalDate, dateToString } from "../logic/DateTimeHelpers";
import Router from "next/router";
import { prisma } from "/.db";
import {
    calculateBenefits,
    calculateMandatoryDeductions,
    calculateVoluntaryDeductions,
    createPayment,
} from "../logic/Payroll";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const companyID = JSON.parse(res._headers.ids).companyId;
    const { userData } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const projectName = res.getHeaders().project;
    const project = await prisma.proyecto.findUnique({
        where: {
            cedulaJuridica_nombre: {
                cedulaJuridica: companyID,
                nombre: projectName,
            },
        },
    });
    const contracts = await prisma.esContratado.findMany({
        where: {
            nombreProyecto: projectName,
            fechaFin: {
                gte: project.fechaFin,
            },
        },
        include: {
            empleado: {
                include: {
                    persona: true,
                    reporteHoras: {
                        select: {
                            horasTrabajadas: true,
                        },
                        where: {
                            nombreProyecto: projectName,
                            fechaHora: {
                                gte: project.fechaInicio,
                                lte: project.fechaFin,
                            },
                            estado: 0,
                        },
                    },
                    selecciona: {
                        include: {
                            beneficios: {
                                select: {
                                    nombreBeneficio: true,
                                    montoPago: true,
                                },
                            },
                        },
                        where: {
                            nombreProyecto: projectName,
                        },
                    },
                    escoge: {
                        select: {
                            nombreDeduccion: true,
                            aporte: true,
                        },
                        where: {
                            nombreProyecto: projectName,
                        },
                    },
                },
            },
        },
    });
    const mandatoryDeductions = await prisma.deduccionObligatoria.findMany({});
    const payments = [];
    const payrollRows = contracts.map((contract, index) => {
        const totalHours = contract.empleado.reporteHoras.reduce(
            (acc, report) => acc + report.horasTrabajadas,
            0
        );
        const grossSalary =
            contract.tipoEmpleado === "Por horas"
                ? contract.salario * totalHours
                : contract.salario;
        const payment = createPayment(
            grossSalary,
            calculateMandatoryDeductions(
                grossSalary,
                mandatoryDeductions,
                "Empleado"
            ),
            calculateMandatoryDeductions(
                grossSalary,
                mandatoryDeductions,
                "Patrono"
            ),
            calculateVoluntaryDeductions(contract.empleado.escoge),
            calculateBenefits(contract.empleado.selecciona)
        );
        payments.push(payment);
        return {
            id: index + 1,
            employee: contract.empleado.persona.nombre,
            baseSalary: contract.salario,
            hours: totalHours,
            grossSalary: grossSalary,
            mandatoryDeductions: payment.totalMandatoryDeductions,
            voluntaryDeductions: payment.totalVoluntaryDeductions,
            netSalary: payment.netSalary,
            type:
                contract.tipoEmpleado === "Por horas"
                    ? "hour"
                    : project.frecuenciaPago,
        };
    });
    return {
        props: {
            payrollRows,
            contracts: JSON.stringify(contracts),
            name: userData.name,
            isEmployer: userData.isEmployer,
            projectString: JSON.stringify(project),
            payments: payments,
        },
    };
}

const payDetail = ({
    projectString,
    name,
    isEmployer,
    payrollRows,
    payments,
    contracts,
}) => {
    const project = JSON.parse(projectString);
    const startDate = createLocalDate(new Date(project.fechaInicio));
    const endDate = createLocalDate(new Date(project.fechaFin));

    const handlePay = async () => {
        await fetch("/api/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contracts: contracts,
                payments: payments,
                frequency: project.frecuenciaPago,
                endDate: project.fechaFin,
            }),
        });
        Router.push("/payroll");
    };
    return (
        <>
            <Sidebar selected={7} username={name} isEmployer={isEmployer} />
            <div className={styles.content}>
                <p className={styles.title}>{`${project.nombre} - pago ${
                    project.frecuenciaPago === "Mensual"
                        ? "mensual"
                        : project.frecuenciaPago === "Quincenal"
                        ? "quincenal"
                        : "semanal"
                }`}</p>
                <p className={styles.subtitle}>{`del ${dateToString(
                    startDate,
                    "/"
                )} al ${dateToString(endDate, "/")}`}</p>
                <Alert
                    className={styles.alert}
                    variant="outlined"
                    severity="warning"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            sx={{ marginTop: 1.9 }}
                        >
                            Ir a horas <AccessTimeIcon sx={{ marginLeft: 1 }} />
                        </Button>
                    }
                >
                    <AlertTitle>12 registros de horas pendientes</AlertTitle>
                    Las horas no aprobadas no serán parte del pago
                </Alert>
                <PaymentDetailTable
                    rows={payrollRows}
                    currency={project.moneda}
                    frequency={project.frecuenciaPago}
                />
                <div className={styles.buttons}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => Router.push("/payroll")}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handlePay}
                    >
                        Pagar Planilla
                    </Button>
                </div>
            </div>
        </>
    );
};

export default payDetail;
