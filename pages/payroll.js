// import { prisma } from "/.db";
import AddIcon from "@mui/icons-material/Add";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import safeJsonStringify from "safe-json-stringify";
import HourTable from "../components/HourTable";
import HourModal from "../components/HourModal";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import IconBox from "../components/IconBox";
import styles from "/styles/payroll.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import PayrollTable from "../components/PayrollTable";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const companyID = JSON.parse(res._headers.ids).companyId;
    const { userData } = jwt.verify(cookies.token, process.env.JWT_SECRET);

    let counter = 0;

    let projects = await prisma.proyecto.findMany({
        where: {
            cedulaJuridica: companyID,
            habilitado: true,
        },
        include: {
            _count: {
                select: {
                    esContratado: true,
                },
            },
        },
        orderBy: {
            nombre: "asc",
        },
    });

    let nextPayDates = projects.map((project) => {
        const daysToAdd =
            project.frecuenciaPago == "Semanal"
                ? 6
                : project.frecuenciaPago == "Quincenal"
                ? 14
                : 29;
        const nextPayDate = new Date(
            new Date(project.fechaInicio).getTime() +
                daysToAdd * 24 * 60 * 60 * 1000
        );
        return nextPayDate;
    });
    let nextPayDatesFormatted = nextPayDates.map((nextPayDate) => {
        let dateArray = String(nextPayDate.toISOString()).split("-");
        dateArray[2] = dateArray[2].split("T")[0];
        let nextPayDateFormatted =
            dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
        return nextPayDateFormatted;
    });

    // const periodStartDates = projects.map((project) => {
    //     const periodStartDate = new Date(
    //         new Date(project.fechaInicio).getTime()
    //     );
    //     return periodStartDate;
    // });

    // const createdDates = projects.map((project) => {
    //     const createdDate = new Date(project.fechaInicio);
    //     return createdDate;
    // });

    // console.log(createdDates);

    // const getState = (
    //     projectCreatedDate,
    //     periodStartDate,
    //     nextPayDate,
    //     companyID,
    //     projectName
    // ) => {
    //     const now = new Date();
    //     const overdue = now > nextPayDate;
    //     if (overdue) {
    //         const daysOverdue = Math.ceil(
    //             (now - nextPayDate) / (1000 * 60 * 60 * 24)
    //         );
    //         return `Pendiente -${daysOverdue}`;
    //     } else {
    //       /// get last period start date
    //       const lastPeriodStartDate = new Date(
    //         new Date(periodStartDate).getTime() -
    //         (project.frecuenciaPago == "Semanal"
    //           ? 7 * 24 * 60 * 60 * 1000
    //           : project.frecuenciaPago == "Quincenal"
    //           ? 14 * 24 * 60 * 60 * 1000
    //           : 29 * 24 * 60 * 60 * 1000)
    //       );
    //       const pays = (await prisma.proyecto.findOne({
    //         where: {
    //           cedulaJuridica: companyID,
    //           nombre: projectName,
    //         },
    //         select: {},
    //         include: {
    //           pagos: {
    //             select: {
    //               fecha: true,
    //             },
    //             orderBy: {
    //               fecha: "desc",
    //             },
    //           },
    //         },
    //       })).pagos;
    //     }
    //     console.log("Pagos", pays);
    //     console.log("Inicio Periodo Anterior", lastPeriodStartDate);
    //     console.log("Fin Periodo Anterior", periodStartDate);
    // };

    // getState()

    const payrollRows = projects.map((project) => {
        return {
            id: counter++,
            projectName: project.nombre,
            employeeCount: project._count.esContratado,
            frequency: project.frecuenciaPago,
            currency: project.moneda,
            nextPayroll: nextPayDatesFormatted[counter - 1],
            state: counter === 3 ? "Pendiente 3" : "Pagado",
            payAction: "Pago",
            historyAction: "hist",
        };
    });
    return {
        props: {
            payrollRows,
            name: userData.name,
            isEmployer: userData.isEmployer,
        },
    };
}

const Payroll = ({ payrollRows, name, isEmployer }) => {
    return (
        <>
            <Sidebar selected={7} username={name} isEmployer={isEmployer} />
            <div className={styles.content}>
                <PayrollTable rows={payrollRows} />
            </div>
        </>
    );
};

export default Payroll;

// rows={[
//     {
//         id: 1,
//         projectName: "Proyecto1",
//         employeeCount: "50",
//         frequency: "Semanal",
//         currency: "CRC",
//         nextPayroll: "27-06-2022",
//         state: "Pagado",
//         payAction: "Pago",
//         historyAction: "hist",
//     },
//     {
//         id: 2,
//         projectName: "Los Guardabosques del Poder",
//         employeeCount: "50",
//         frequency: "Mensual",
//         currency: "USD",
//         nextPayroll: "27-06-2022",
//         state: "Pendiente -3",
//         payAction: "Pago",
//         historyAction: "hist",
//     },
//     {
//         id: 3,
//         projectName: "Proyecto3 con un nombre mas decente",
//         employeeCount: "50",
//         frequency: "Quincenal",
//         currency: "CRC",
//         nextPayroll: "27-06-2022",
//         state: "Pendiente 5",
//         payAction: "Pago",
//         historyAction: "hist",
//     },
// ]}
// />
