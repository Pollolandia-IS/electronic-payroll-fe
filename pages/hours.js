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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
    const { companyID, employeeID, projectID } = context.params;

    const hours = await prisma.reporteHoras.findMany({
        where: {
            cedulaEmpleado: employeeID,
        },
    });

    let counter = 0;

    const hoursWithId = hours.map(
        (hourTime) => (
            console.log(hourTime),
            {
                id: counter++,
                hours: hourTime.horasTrabajadas,
                date: JSON.stringify(hourTime.fechaHora)
                    .split("T")[0]
                    .substring(1),
                nameProject: hourTime.nombreProyecto,
                state:
                    hourTime.estado == 0
                        ? "Aprobado"
                        : hourTime.estado == 1
                        ? "Pendiente"
                        : "Rechazado",
            }
        )
    );

    let employeesNotInThisProject = await prisma.esContratado.findMany({
        where: {
            cedulaEmpleado: employeeID,
        },
        select: {
            nombreProyecto: true,
        },
    });

    let projectQuery = (
        await prisma.proyecto.findMany({
            where: {
                cedulaJuridica: companyID,
            },
            select: {
                nombre: true,
            },
        })
    ).filter((project) =>
        employeesNotInThisProject.every(
            (employee) => employee.nombreProyecto === project.nombre
        )
    );

    const proyectString = JSON.parse(safeJsonStringify(projectQuery));

    console.log(proyectString);

    return {
        props: {
            hoursWithId,
            nombreProyecto: projectID,
            cedulaEmpleado: employeeID,
            cedulaJuridica: companyID,
            proyectString,
        },
    };
}

const AddHoursEmployee = ({
    nombreProyecto,
    cedulaEmpleado,
    hoursWithId,
    cedulaJuridica,
    proyectString,
}) => {
    const projects = proyectString;
    const [showModal, setShowModal] = useState(false);
    const [hours, setHoursState] = useState(0);
    const [date, setDateState] = useState("2022-10-08 00:00:00");
    const [button, setButtonState] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [hoursProject, setHoursProject] = useState([]);
    const router = useRouter();

    const handleChangeHoursProject = (value) => {
        setHoursProject(value);
    };

    useEffect(() => {
        handleChangeHoursProject(() => {
            return hoursWithId.filter(
                (hour) => hour.nameProject === selectedProjectName
            );
        });
    }, [selectedProjectName]);

    const handleChangeProject = (e) => {
        setSelectedProjectName(e.target.value);
    };

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
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
            setDateState(event.toISOString().slice(0, 19).replace("T", " "));
            handleButtonState(false);
        }
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
                date,
            }),
        });
        setShowModal(false);
        router.reload();
    };

    return (
        <>
            <HourModal
                date={date}
                handleDate={handleDateChange}
                hours={hours}
                handleHours={handleHoursChange}
                employeeID={cedulaEmpleado}
                project={nombreProyecto}
                isOpen={showModal}
                setIsOpen={setShowModal}
                handleSubmit={handleSubmit}
                disableButton={button}
                handleButton={handleButtonState}
            />
            <div className={Styles.body}>
                <div className={Styles.sidebar}>
                    <Sidebar />
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
                        <Search
                            handleSearch={handleTextChange}
                            searchText={searchText}
                            placeholder="Buscar beneficio..."
                        />
                        <IconBox action={() => setShowModal(true)}>
                            <AddIcon fontSize="large" />
                        </IconBox>
                    </div>
                    <div className={Styles.container}>
                        <HourTable rows={hoursProject} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddHoursEmployee;
