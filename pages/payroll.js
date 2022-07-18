import { prisma } from "/.db";
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
import { dateToString } from "../logic/DateTimeHelpers"
import { calculateProjectState, getNextPaymentDate } from "../logic/Payroll";

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

    const payrollRows = projects.map((project) => {
        project.fechaInicio.setHours(project.fechaInicio.getHours() + 6);
        project.fechaFin.setHours(project.fechaFin.getHours() + 6);
        const projectState = calculateProjectState(project.fechaFin);
        return {
            id: counter++,
            projectName: project.nombre,
            employeeCount: project._count.esContratado,
            currency: project.moneda,
            startPayroll: dateToString(project.fechaInicio),
            nextPayroll: dateToString(project.fechaFin),
            state: projectState,
            payAction: projectState.startsWith("Pendiente"),
            historyAction: "Historial",
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
