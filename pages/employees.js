import Sidebar from "../components/Sidebar";
import Styles from "/styles/Empleados.module.css";
import { prisma } from "/.db";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { Avatar } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import ProjectsTable from "../components/ProjectsTable";
import EmployeeDrawer from "../components/EmployeeDrawer";
import ModalCompanyEmployee from "../components/ModalCompanyEmployee";
import ModalProjectEmployee from "../components/ModalProjectEmployee";
import safeJsonStringify from "safe-json-stringify";
import IconBox from "../components/IconBox";
import AddIcon from "@mui/icons-material/Add";
import Router from "next/router";

const Avatar1 = styled(Avatar)({
    width: `32px`,
    height: `32px`,
});

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

    let employees = (
        await prisma.empleado.findMany({
            where: { cedulaJuridica: companyID },
            include: { persona: { include: { hace_uso: true } } },
        })
    ).map((e) => e.persona);

    employees.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        } else {
            return 0;
        }
    });

    const projectsContracted = await prisma.esContratado.findMany({
        where: {
            cedulaJuridica: companyID,
        },
        select: {
            nombreProyecto: true,
            cedulaEmpleado: true,
            tipoEmpleado: true,
            puesto: true,
            fechaInicio: true,
            fechaFin: true,
            jornada: true,
            salario: true,
        },
    });

    let contractsEmployee = [];
    employees.map((employee) => {
        let count = 0;
        projectsContracted.map((project) => {
            if (employee.cedula === project.cedulaEmpleado) {
                count++;
            }
        });

        contractsEmployee.push({
            id: employee.cedula,
            name: employee.nombre,
            count: count,
        });
    });

    let reportsEmployee =
        await prisma.$queryRaw`SELECT r.cedulaEmpleado, COUNT(*) AS counterVal FROM reporteHoras r WHERE cedulaJuridica = ${companyID} AND estado = 1 GROUP BY cedulaEmpleado`;

    console.log("From DB to reports", companyID);
    const projects = await prisma.proyecto.findMany({
        where: {
            cedulaJuridica: companyID,
            habilitado: true,
        },
        select: { nombre: true },
    });

    projects.push({ nombre: "Todos los proyectos" });
    const JSONProjectContract = JSON.parse(
        safeJsonStringify(projectsContracted)
    );

    return {
        props: {
            projects,
            cedulaEmpleado: employeeID,
            name: userData.name,
            isEmployer: userData.isEmployer,
            employeesDB: employees,
            contractsEmployee,
            JSONProjectContract,
            companyID,
            reportsEmployee,
        },
    };
}
const Employees = ({
    cedulaEmpleado,
    name,
    isEmployer,
    projects,
    employeesDB,
    contractsEmployee,
    JSONProjectContract,
    companyID,
    reportsEmployee,
}) => {
    const [employees, setEmployees] = useState(employeesDB);
    const [selectedProjectName, setSelectedProjectName] = useState(
        "Todos los proyectos"
    );
    const [projectsRow, setProjectsRow] = useState([]);
    const [employeesRow, setEmployeesRow] = useState([]);
    const [contractsOfProject, setContractsOfProject] = useState([]);
    const [employeesNotContracted, setEmployeesNotContracted] = useState([]);
    const [isProjectSelected, setIsProjectSelected] = useState(false);
    const [showModalCompany, setShowModalCompany] = useState(false);
    const [showModalProject, setShowModalProject] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editEmployee, setEditEmployee] = useState(false);
    const [newEmployeeInfo, setNewEmployeeInfo] = useState({
        name: "",
        id: "",
        email: "",
        phone: "",
    });
    const [newProjectContract, setNewProjectContract] = useState({
        name: "",
        id: "",
        type: "",
        position: "",
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
        salary: "",
        hours: 0,
    });
    const [userInfoChange, setUserInfoChange] = useState("");

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpenDrawer(open);
    };

    const handleClearNewInfo = () => {
        setNewEmployeeInfo({ name: "", id: "", email: "", phone: "" });
        setNewProjectContract({
            name: "",
            id: "",
            type: "",
            position: "",
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
            salary: "",
            hours: 0,
        });
    };

    useEffect(() => {
        if (selectedProjectName === "Todos los proyectos") {
            setProjectsRow(employeesRow);
            setIsProjectSelected(false);
        } else {
            let indexID = 0;
            let indexName = 0;
            const projectsContracted = JSONProjectContract.filter(
                (project) => project.nombreProyecto === selectedProjectName
            ).map((contract) => {
                indexID++;
                return {
                    ...contract,
                    id: indexID,
                    name: employees.find(
                        (employee) =>
                            employee.cedula === contract.cedulaEmpleado
                    ).nombre,
                    cedula: contract.cedulaEmpleado,
                    tipoEmpleado: contract.tipoEmpleado,
                    puesto: contract.puesto,
                    fechaInicio: contract.fechaInicio.split("T")[0],
                    fechaFin: contract.fechaFin.split("T")[0],
                    jornada: contract.jornada,
                    salario: contract.salario,
                };
            });

            const projectsNotContracted = employees
                .filter(
                    (employee) =>
                        !projectsContracted.find(
                            (contract) => contract.cedula === employee.cedula
                        )
                )
                .map((employee) => {
                    indexName++;
                    return {
                        id: indexName,
                        name: employee.nombre,
                        cedula: employee.cedula,
                    };
                });

            setEmployeesNotContracted(projectsNotContracted);
            setContractsOfProject(projectsContracted);
            setIsProjectSelected(true);
        }
    }, [selectedProjectName]);

    const editEmployeeCompany = (event) => {
        const user = employees.find((employee) => {
            if (employee.cedula === event) {
                return employee;
            }
        });

        setNewEmployeeInfo({
            name: user.nombre,
            id: user.cedula,
            email: user.hace_uso[0].email,
            phone: user.telefono,
        });
        setUserInfoChange({
            name: user.nombre,
            id: user.cedula,
            email: user.hace_uso[0].email,
            phone: user.telefono,
        });

        setEditEmployee(true);
        setShowModalCompany(true);
    };

    useEffect(() => {
        let hoursOfEmployee = 0;
        let array = [];
        let index = 0;
        let projectsRow = employees.map((employee) => {
            hoursOfEmployee = reportsEmployee.find( (report) => report.cedulaEmpleado === employee.cedula);
            index++;
            return {
                id: index,
                cedula: employee.cedula,
                name: employee.nombre,
                mail: employee.hace_uso[0].email,
                phone: employee.telefono,
                projects: contractsEmployee.find(
                    (contract) => contract.id === employee.cedula
                ).count,
                reports: hoursOfEmployee ? hoursOfEmployee.counterVal : 0,
            };
        });
        for (let i = 0; i < projectsRow.length; i++) {
            array.push(projectsRow[i]);
        }
        setEmployeesRow(array);
        setProjectsRow(array);
    }, []);

    const handleChangeProject = (e) => {
        setSelectedProjectName(e.target.value);
    };

    const handleSubmitProjectContract = async () => {
        const newContract = {
            cedulaJuridica: companyID,
            nombreProyecto: selectedProjectName,
            cedulaEmpleado: newProjectContract.id,
            tipoEmpleado: newProjectContract.type,
            puesto: newProjectContract.position,
            fechaInicio: newProjectContract.startDate.toISOString(),
            fechaFin: newProjectContract.endDate.toISOString(),
            jornada:
                newProjectContract.type !== "Por horas"
                    ? newProjectContract.hours
                    : null,
            salario: parseFloat(newProjectContract.salary),
        };

        try {
            const response = await fetch("/api/addEmployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContract),
            });

            Router.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitCompanyEmployee = async () => {
        try {
            let response = null;
            if (editEmployee) {
                response = await fetch("/api/employees", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        Nombre: newEmployeeInfo.name,
                        Cedula: newEmployeeInfo.id.toString(),
                        Email: newEmployeeInfo.email,
                        Telefono: newEmployeeInfo.phone.toString(),
                    }),
                });
            } else {
                response = await fetch("/api/employees", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        Nombre: newEmployeeInfo.name,
                        Cedula: newEmployeeInfo.id.toString(),
                        Email: newEmployeeInfo.email,
                        Telefono: newEmployeeInfo.phone.toString(),
                        CedJuridica: companyID,
                    }),
                });
            }

            Router.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ModalCompanyEmployee
                employeeInfoCopy={userInfoChange}
                isEditing={editEmployee}
                employeeInfo={newEmployeeInfo}
                setEmployeeInfo={setNewEmployeeInfo}
                isOpen={showModalCompany}
                setIsOpen={setShowModalCompany}
                handleSubmit={handleSubmitCompanyEmployee}
            />
            <ModalProjectEmployee
                submitContract={handleSubmitProjectContract}
                openDrawer={openDrawer}
                toggleDrawer={setOpenDrawer}
                projectNewContract={newProjectContract}
                setProjectNewContract={setNewProjectContract}
                isOpen={showModalProject}
                setIsOpen={setShowModalProject}
                projectSelected={selectedProjectName}
            />
            <EmployeeDrawer
                projectNewContract={newProjectContract}
                setProjectNewContract={setNewProjectContract}
                projectNoContracted={employeesNotContracted}
                isOpen={showModalProject}
                setIsOpen={setShowModalProject}
                open={openDrawer}
                toggleDrawer={toggleDrawer}
            />
            <Sidebar selected={3} username={name} isEmployer={isEmployer} />
            <div className={Styles.container}>
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
                            selectedProjectName === "Todos los proyectos"
                                ? setShowModalCompany(true)
                                : setShowModalProject(true);
                            handleClearNewInfo();
                            setEditEmployee(false);
                        }}
                        isDisabled={selectedProjectName === ""}
                    >
                        <AddIcon fontSize="large" />
                    </IconBox>
                </div>
                <div className={Styles.cards}>
                    {projectsRow && projectsRow.length > 0 ? (
                        isProjectSelected ? (
                            contractsOfProject.length > 0 ? (
                                <ProjectsTable rows={contractsOfProject} />
                            ) : (
                                <div className={Styles.main__noContracts}>
                                    No hay contrataciones para este proyecto
                                </div>
                            )
                        ) : projectsRow.length > 0 ? (
                            <EmployeeTable
                                rows={projectsRow}
                                editEmployeeCompany={editEmployeeCompany}
                            />
                        ) : (
                            <div className={Styles.main__noEmployees}>
                                No hay empleados agregados aún
                            </div>
                        )
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Employees;
