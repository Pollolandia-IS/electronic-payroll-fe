import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EmployeeHoursCard from "../components/EmployeeHoursCard";
import Search from "../components/Search";
import ReportHoursTable from "../components/ReportHoursTable";
import styles from "../styles/EmployerHours.module.css";
import jwt from "jsonwebtoken";
import { styled } from "@mui/material/styles";

const Arrow = styled("img")({
    height: `20px`,
    width: `10px`,
    margin: `0px`,
});

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

    let counter = 0;
    const hoursReportsWithId = hoursReports.map((hourTime) => ({
        id: counter++,
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
        employeesReports.push(`${employee.nombre},${employee.cedula}`);
    }

    return {
        props: {
            hoursReports: JSON.stringify(hoursReports),
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
    hoursReports,
    hoursReportsWithId,
    employeesReports,
    employeesId,
    employerId,
    companyId,
    isEmployer,
    name,
}) => {
    const [dateHours, setDateHours] = useState(JSON.parse(hoursReports));
    const [hours, setHours] = useState(hoursReportsWithId);
    const [employees, setEmployees] = useState(employeesReports);
    const [employeesIds, setEmployeesIds] = useState(employeesId);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedProject, setSelectedProject] = useState("");
    const [searchText, setSearchText] = useState("");
    const [action, setAction] = useState(true);
    const [method, setMethod] = useState("");

    useEffect(() => {
        if (method === "approve") {
            approveHour();
        } else if (method === "reject") {
            rejectHour();
        }
    }, [action]);

    const selectReport = (selectedReport, selectedAction) => {
        setSelectedProject(selectedReport.project);
        setSelectedDate(selectedReport.date);
        setMethod(selectedAction);
        setAction(!action);
    };

    const createEmployeeCard = (nombre, cedula) => {
        return (
            <EmployeeHoursCard
                key={cedula}
                id={cedula}
                name={nombre}
                pending={checkHours(cedula)}
                setSelectedEmployee={setSelectedEmployee}
                setSelectedId={setSelectedId}
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
                    employee[0]
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    employee[1].toLowerCase().includes(searchText.toLowerCase())
                ) {
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
                    <div className={styles.right__subtitle}>
                        <h1>
                            Utiliza el botón de{" "}
                            <Arrow src="/assets/img/Arrow.png" alt={"Arrow"} />{" "}
                            para seleccionar un empleado.
                        </h1>
                    </div>
                </div>
            );
        } else {
            return createHourtable();
        }
    };

    const createHourtable = () => {
        let employeeHours = [];
        employeeHours = getTableRows();
        if (employeeHours.length === 0) {
            return (
                <div className={styles.right}>
                    <div className={styles.right_subtitle}>
                        <h1>No hay reportes de horas para este empleado.</h1>
                    </div>
                </div>
            );
        } else {
            return (
                <ReportHoursTable
                    rows={employeeHours}
                    selectReport={selectReport}
                />
            );
        }
    };

    const getTableRows = () => {
        let employeeHours = [];
        let employeeId = "";
        employees.map((employee) => {
            employee = employee.split(",");
            if (employee[0] === selectedEmployee) {
                employeeId = employee[1];
            }
        });
        let index = 0;
        hours.map((report) => {
            if (report.cedulaEmpleado === employeeId) {
                let reportData = {
                    id: index++,
                    project: report.nombreProyecto,
                    hours: report.horasTrabajadas,
                    date: report.fechaHora,
                    state: getState(report.estado),
                };
                employeeHours.push(reportData);
            }
        });
        return employeeHours;
    };

    const getState = (state) => {
        if (state === 0) {
            return "Aprobado";
        } else if (state === 1) {
            return "Pendiente";
        } else {
            return "Rechazado";
        }
    };

    const getDateForDB = (date) => {
        let dateDB = "";
        dateHours.map((hour) => {
            if (hour.fechaHora.includes(date)) {
                dateDB = hour.fechaHora;
            }
        });
        return dateDB;
    };

    const approveHour = async () => {
        const dataForDB = {
            estado: 0,
            fechaHora: getDateForDB(selectedDate),
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
            getEmployees();
            getEmployeeHours();
        } catch (error) {
            console.log(error);
        }
    };

    const rejectHour = async () => {
        const dataForDB = {
            estado: 69,
            fechaHora: getDateForDB(selectedDate),
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
            getEmployees();
            getEmployeeHours();
        } catch (error) {
            console.log(error);
        }
    };

    const getReports = async () => {
        setHours([]);
        setDateHours([]);
        setEmployees([]);
        setEmployeesIds([]);
        const reqBody = {
            employerId: employerId,
            companyId: companyId,
        };
        const hoursFromDB = await (
            await fetch(`/api/employerGetReports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        setHours(hoursFromDB.hoursReportsWithId);
        setDateHours(hoursFromDB.hours);
        setEmployeesIds(hoursFromDB.employeesIds);
        setEmployees(hoursFromDB.employeesReports);
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
