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
import Styles from "/styles/AddHoursEmployee.module.css";
import EmptyProjects from "../components/EmptyProjects";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const TextFieldStandard = styled(Select)({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 2px 5px rgba(0, 0, 0, 0.15)`,
    borderRadius: `7px`,
    display: `flex`,
    flexDirection: `row`,
    width: `343px`,
    height: `50px`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `24px`,
    padding: `0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
});

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const ids = JSON.parse(res._headers.ids);
    const { userData } = jwt.verify(cookies.token, process.env.JWT_SECRET);
    const employeeID = ids.id;
    const companyID = ids.companyId;

    const hours = await prisma.reporteHoras.findMany({
        where: {
            cedulaEmpleado: employeeID,
        },
    });

    let counter = 0;

    const hoursWithId = hours.map((hourTime) => {
        hourTime.fechaHora.setHours(hourTime.fechaHora.getHours() - 6);
        return {
            id: counter++,
            hours: hourTime.horasTrabajadas,
            date: JSON.stringify(hourTime.fechaHora)
                .split("T")[0]
                .substring(1)
                .concat(" | ")
                .concat(
                    JSON.stringify(hourTime.fechaHora)
                        .split("T")[1]
                        .substring(0, 5)
                ),
            nameProject: hourTime.nombreProyecto,
            state:
                hourTime.estado == 0
                    ? "Aprobado"
                    : hourTime.estado == 1
                    ? "Pendiente"
                    : "Rechazado",
        };
    });

    let employeeProjects = await prisma.esContratado.findMany({
        where: {
            cedulaEmpleado: employeeID,
            tipoEmpleado: "Por horas",
        },
        select: {
            nombreProyecto: true,
        },
    });

    let projectQuery = await prisma.proyecto.findMany({
        where: {
            cedulaJuridica: companyID,
        },
        select: {
            nombre: true,
        },
    });
    projectQuery = projectQuery.filter((project) =>
        employeeProjects.some(
            (employee) => employee.nombreProyecto === project.nombre
        )
    );

    const proyectString = JSON.parse(safeJsonStringify(projectQuery));
    proyectString.push({
        nombre: "Todos los proyectos",
    });

    return {
        props: {
            hoursWithId,
            cedulaEmpleado: employeeID,
            proyectString,
            name: userData.name,
            isEmployer: userData.isEmployer,
        },
    };
}

const AddHoursEmployee = ({
    cedulaEmpleado,
    hoursWithId,
    proyectString,
    name,
    isEmployer,
}) => {
    const projects = proyectString;
    let hoursUsers = [];
    for (let hour of hoursWithId) {
        hoursUsers.push(hour);
    }
    const [hourToAdd, setHourToAdd] = useState([]);
    const [nextId, setNextId] = useState(hoursUsers.length);
    const [showModal, setShowModal] = useState(false);
    const [hours, setHoursState] = useState(0);
    const [date, setDateState] = useState(new Date());
    const [button, setButtonState] = useState(true);
    const [selectedProjectName, setSelectedProjectName] = useState(
        "Todos los proyectos"
    );
    const [hoursProject, setHoursProject] = useState([]);

    const handleChangeHoursProject = (value) => {
        setHoursProject(value);
    };
    useEffect(() => {
        if (selectedProjectName === "Todos los proyectos") {
            if (hourToAdd.length > 0) {
                setHoursProject(hoursUsers.concat(hourToAdd));
            } else {
                setHoursProject(hoursUsers);
            }
        } else {
            handleChangeHoursProject(() => {
                return hoursUsers
                    .filter((hour) => hour.nameProject === selectedProjectName)
                    .concat(
                        hourToAdd.filter(
                            (hourAdd) =>
                                hourAdd.nameProject === selectedProjectName
                        )
                    );
            });
        }
    }, [selectedProjectName]);

    const handleChangeProject = (e) => {
        setSelectedProjectName(e.target.value);
    };

    const handleButtonState = (value) => {
        setButtonState(value);
    };

    const handleHoursChange = (event) => {
        setHoursState(event.target.value);
        if (event.target.value > 0 && event.target.value <= 24) {
            handleButtonState(false);
        } else {
            handleButtonState(true);
        }
    };

    const handleDateChange = (event) => {
        if (event != "Invalid Date") {
            setDateState(event);
            handleButtonState(false);
        }
        handleHoursChange({ target: { value: hours } });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/addHoursEmployee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                employeeID: cedulaEmpleado,
                projectID: selectedProjectName,
                hours,
                date: date.toISOString(),
            }),
        });
        setShowModal(false);

        if (response.status === 200) {
            const newDate = new Date(date.toISOString());
            newDate.setHours(newDate.getHours() - 6);

            const newHour = {
                id: nextId,
                hours: parseInt(hours),
                date: newDate
                    .toISOString()
                    .substring(0, 10)
                    .concat(" | ")
                    .concat(newDate.toISOString().substring(11, 16)),
                nameProject: selectedProjectName,
                state: "Aprobado",
            };
            setNextId(nextId + 1);
            setHourToAdd(hourToAdd.concat(newHour));
            setHoursProject([...hoursProject, newHour]);
        }
    };

    return projects.length > 1 ? (
        <>
            <HourModal
                date={date}
                handleDate={handleDateChange}
                hours={hours}
                handleHours={handleHoursChange}
                employeeID={cedulaEmpleado}
                isOpen={showModal}
                setIsOpen={setShowModal}
                handleSubmit={handleSubmit}
                disableButton={button}
                handleButton={handleButtonState}
            />
            <div className={Styles.body}>
                <div className={Styles.sidebar}>
                    <Sidebar
                        selected={4}
                        username={name}
                        isEmployer={isEmployer}
                    />
                </div>
                <div className={Styles.main}>
                    <div className={Styles.main__header}>
                        <FormControl>
                            <InputLabel id="select-label"></InputLabel>
                            <TextFieldStandard
                                id="projectName"
                                value={selectedProjectName}
                                size="medium"
                                onChange={handleChangeProject}
                            >
                                {projects.map((project) => (
                                    <MenuItem
                                        key={project.nombre}
                                        value={project.nombre}
                                    >
                                        {" "}
                                        {project.nombre}{" "}
                                    </MenuItem>
                                ))}
                            </TextFieldStandard>
                        </FormControl>
                        <IconBox
                            action={() => {
                                setDateState(new Date());
                                setShowModal(true);
                            }}
                            isDisabled={
                                selectedProjectName === "" ||
                                selectedProjectName === "Todos los proyectos"
                            }
                        >
                            <AddIcon fontSize="large" />
                        </IconBox>
                    </div>
                    <div className={Styles.container}>
                        <HourTable rows={hoursProject} />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div className={Styles.body}>
            <div className={Styles.sidebar}>
                <Sidebar selected={4} username={name} isEmployer={isEmployer} />
            </div>
            <div className={Styles.main}>
                <EmptyProjects />
            </div>
        </div>
    );
};

export default AddHoursEmployee;
