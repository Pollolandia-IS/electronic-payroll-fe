import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeHoursCard from "../components/EmployeeHoursCard";
import Search from "../components/Search";
import ReportHoursTable from "../components/ReportHoursTable";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlineIcon from "@mui/icons-material/CancelOutlined";
import styles from "../styles/EmployerHours.module.css";
import { hoursToMilliseconds, set } from "date-fns";
import jwt from "jsonwebtoken";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const ids = JSON.parse(res._headers.ids);
    const { userData } = jwt.verify(cookies.token, process.env.JWT_SECRET);
    const employerId = ids.id;
    const companyId = ids.companyId;
    let isEmployer = userData.isEmployer;
    let name = userData.name;

    const hoursReports = await prisma.reporteHoras.findMany({
        where: {
            cedulaEmpleador: employerId,
            cedulaJuridica: companyId,
        },
        select: {
            nombreProyecto: true,
            horasTrabajadas: true,
            fechaHora: true,
            estado: true,
            cedulaEmpleado: true,
        },
        orderBy: {
            cedulaEmpleado: "asc",
        },
    });

    const hoursReportsWithId = hoursReports.map((hourTime) => ({
        horasTrabajadas: hourTime.horasTrabajadas,
        fechaHora: JSON.stringify(hourTime.fechaHora)
            .split("T")[0]
            .substring(1),
        nombreProyecto: hourTime.nombreProyecto,
        estado: hourTime.estado,
        cedulaEmpleado: hourTime.cedulaEmpleado,
    }));

    let employeesId = [];
    for (let i = 0; i < hoursReports.length; i++) {
        if (!employeesId.includes(hoursReports[i].cedulaEmpleado)) {
            employeesId.push(hoursReports[i].cedulaEmpleado);
        }
    }

    let employeesReports = [];
    for (let i = 0; i < employeesId.length; i++) {
        const employee = await prisma.persona.findUnique({
            where: {
                cedula: employeesId[i],
            },
            select: {
                nombre: true,
                cedula: true,
            },
        });
        employeesReports.push(`${employee.nombre}, ${employee.cedula}`);
    }

    return {
        props: {
            hoursReportsWithId,
            employeesReports,
            employeesId,
            employerId,
            companyId,
            isEmployer,
            name,
        },
    };
}

const employerHours = ({
    hoursReportsWithId,
    employeesReports,
    employeesId,
    employerId,
    companyId,
    isEmployer,
    name,
}) => {
    const [hours, setHours] = useState(hoursReportsWithId);
    const [employees, setEmployees] = useState(employeesReports);
    const [employeesIds, setEmployeesIds] = useState(employeesId);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [searchText, setSearchText] = useState("");

    const createEmployeeCard = (nombre, cedula) => {
        return (
            <EmployeeHoursCard
                name={nombre}
                pending={checkHours(cedula)}
                setSelectedEmployee={setSelectedEmployee}
            />
        );
    };

    const getEmployees = () => {
        return employees.map((employee) => {
            employee = employee.split(",");
            if (searchText === "") {
                return createEmployeeCard(employee[0], employee[1]);
            } else {
                if (
                    employee[0].includes(searchText) ||
                    employee[1].includes(searchText)
                ) {
                    employee = employee.split(",");
                    return createEmployeeCard(employee[0], employee[1]);
                }
            }
        });
    };

    const checkHours = (cedula) => {
        let pending = false;
        for (let i = 0; i < hours.length; i++) {
            if (hours[i].cedulaEmpleado === cedula && hours[i].estado === 1) {
                pending = true;
            }
        }
        return pending;
    };

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
        getEmployees();
    };

    const getEmployeeHours = () => {
        if (selectedEmployee === "") {
            return (
                <div className={styles.right}>
                    <div className={styles.right_subtitle}>
                        <h1>No has seleccionado ningún empleado.</h1>
                    </div>
                </div>
            );
        } else {
            return createHourtable(selectedEmployee);
        }
    };

    const createHourtable = (employeeName) => {
        let employeeHours = [];
        let employeeId = "";

        for (let i = 0; i < employees.length; i++) {
            if (employees[i][0] === employeeName) {
                employeeId = employees[i][1];
                setSelectedId(employeeId);
            }
        }
        employeeHours = getTableRows(employeeId);
        if (employeeHours.length === 0) {
            return (
                <div className={styles.right}>
                    <div className={styles.right_subtitle}>
                        <h1>No hay reportes de horas para este empleado.</h1>
                    </div>
                </div>
            );
        } else {
            return <ReportHoursTable rows={employeeHours} />;
        }
    };

    const getTableRows = (employeeId) => {
        let employeeHours = [];
        for (let i = 0; i < hours.length; i++) {
            if (hours[i].cedulaEmpleado === employeeId) {
                let row = [];
                row.push(hours[i].nombreProyecto);
                row.push(hours[i].horasTrabajadas);
                row.push(hours[i].fechaHora);
                let state = getState(
                    hours[i].estado,
                    hours[i].nombreProyecto,
                    hours[i].fechaHora
                );
                row.push(state);
                employeeHours.push(row);
            }
        }
        return employeeHours;
    };

    const getState = (state, projectName, date) => {
        if (state === 0) {
            return "Aprobado";
        } else if (state === 1) {
            return "Pendiente";
        } else {
            return (
                <div className={styles.report_state}>
                    <Tooltip title="Aprobar" arrow placement="top">
                        <IconButton
                            size="small"
                            onClick={() => {
                                approveHour();
                                setSelectedProject(projectName);
                                setSelectedDate(date);
                            }}
                        >
                            <CheckCircleOutlineIcon color="success" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Rechazar" arrow placement="top">
                        <IconButton
                            size="small"
                            onClick={() => {
                                rejectHour();
                                setSelectedProject(projectName);
                                setSelectedDate(date);
                            }}
                        >
                            <CancelOutlineIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }
    };

    const approveHour = () => {
        console.log("LLegue con: ", selectedProject, selectedDate);
        /*const dataForDB = {
            estado: 0,
            nombreProyecto: selectedProject,
            fechaHora: selectedDate,
            cedulaEmpleado: selectedId,
        };
        try {
            await fetch(`api/employerHourReport`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForDB),
            });
            getReports();
            getEmployeesIds();
            getEmployees();
            getEmployeeHours();
        } catch (error) {
            console.log(error);
        }*/
    };

    const rejectHour = () => {
        console.log("LLegue con: ", selectedProject, selectedDate);
        /*const dataForDB = {
            estado: 69,
            nombreProyecto: selectedProject,
            fechaHora: selectedDate,
            cedulaEmpleado: selectedId,
        };
        try {
            await fetch(`api/employerHourReport`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForDB),
            });
            getReports();
            getEmployeesIds();
            getEmployees();
            getEmployeeHours();
        } catch (error) {
            console.log(error);
        }*/
    };

    const getReports = async () => {
        const reqBody = {
            employerId: employerId,
            companyId: companyId,
        };
        const hours = await (
            await fetch(`/api/employerGetReports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        setHours(hours);
        setEmployeesIds([]);
        for (let i = 0; i < hours.length; i++) {
            if (!employeesIds.includes(hours[i].cedulaEmpleado)) {
                employeesIds.push(hours[i].cedulaEmpleado);
            }
        }
    };

    const getEmployeesIds = async () => {
        const reqBody = {
            employeesIds: employeesIds,
        };
        const employees = await (
            await fetch(`/api/employerGetEmployees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        setEmployees(employees);
    };

    return (
        <>
            <Sidebar selected={8} username={name} isEmployer={isEmployer} />
            <div className={styles.container}>
                <div className={styles.left}>
                    <Search
                        handleSearch={handleTextChange}
                        searchText={searchText}
                        placeholder="Buscar empleado..."
                    />
                    <div className={styles.employee_cards}>
                        {getEmployees()}
                    </div>
                </div>
                <div className={styles.right}>{getEmployeeHours()}</div>
            </div>
        </>
    );
};

export default employerHours;
