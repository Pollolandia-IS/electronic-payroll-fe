import Sidebar from "../components/Sidebar";
import Styles from "/styles/Empleados.module.css";
import { prisma } from "/.db";
import Search from "../components/Search.js";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { Avatar } from "@mui/material";
import { IoTrashSharp } from "react-icons/io5";
import EmployeeTable from "../components/EmployeeTable";
import ProjectsTable from "../components/ProjectsTable";
import EmployeeDrawer from "../components/EmployeeDrawer";
import ModalCompanyEmployee from "../components/ModalCompanyEmployee";
import ModalProjectEmployee from "../components/ModalProjectEmployee";
import safeJsonStringify from "safe-json-stringify";
import IconBox from "../components/IconBox";
import AddIcon from "@mui/icons-material/Add";
import { set } from "date-fns";

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

    const projectsContracted = ( await prisma.esContratado.findMany({
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
    }))

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



    const projects = await prisma.proyecto.findMany({
        where: { 
            cedulaJuridica: companyID,
            habilitado: true,
        },
        select: { nombre: true },
    });

    projects.push({ nombre: "Todos los proyectos" });
    const JSONProjectContract = JSON.parse(safeJsonStringify(projectsContracted));

    return {
        props: {
            projects,
            cedulaEmpleado: employeeID,
            name: userData.name,
            isEmployer: userData.isEmployer,
            employees,
            contractsEmployee,
            JSONProjectContract,
            companyID,
        },
    };
}
const Employees = ({ cedulaEmpleado, name, isEmployer, projects,employees, contractsEmployee, JSONProjectContract, companyID }) => {

    const [selectedProjectName, setSelectedProjectName] = useState("Todos los proyectos");
    const [projectsRow, setProjectsRow] = useState([]);
    const [employeesRow, setEmployeesRow] = useState([]);
    const [indexCompany, setIndexCompany] = useState(0);
    const [indexProject, setIndexProject] = useState(0);
    const [contractsOfProject, setContractsOfProject] = useState([]);
    const [isProjectSelected, setIsProjectSelected] = useState(false);
    const [showModalCompany, setShowModalCompany] = useState(false);
    const [showModalProject, setShowModalProject] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [newEmployeeInfo, setNewEmployeeInfo] = useState({ name: "", id: "", email: "", phone: "",});

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpenDrawer(open);
    };

    useEffect(() => {
        if (selectedProjectName === "Todos los proyectos") {
            setProjectsRow(employeesRow);
            setIsProjectSelected(false);
        } else {
            let indexID = 0;
            const projectsContracted = JSONProjectContract.filter(
                (project) => project.nombreProyecto === selectedProjectName
            ).map((contract) => {
                indexID++;
                return {
                    ...contract,
                    id: indexID,
                    name: employees.find((employee) => employee.cedula === contract.cedulaEmpleado).nombre,
                    cedula: contract.cedulaEmpleado,
                    tipoEmpleado: contract.tipoEmpleado,
                    puesto: contract.puesto,
                    fechaInicio: contract.fechaInicio.split("T")[0],
                    fechaFin: contract.fechaFin.split("T")[0],
                    jornada: contract.jornada,
                    salario: contract.salario,
                    button: handleSayHello,
                }}
            );

            setContractsOfProject(projectsContracted);
            setIsProjectSelected(true);
        }
    }, [selectedProjectName]);

    const handleSayHello = (event) => {
        console.log(event);
    }

    const deleteEmployee =  (event) => {
        console.log(event);
    }

    useEffect(() => {
        console.log(employees);
        let array = [];
        let index = 0;
        let projectsRow = employees.map((employee) => {
            index++;
            return (
                {
                    id: index,
                    cedula: employee.cedula,
                    name: employee.nombre,
                    mail: employee.hace_uso[0].email,
                    phone: employee.telefono,
                    projects: contractsEmployee.find((contract) => contract.id === employee.cedula).count,
                    reports: 1,
                    button: handleSayHello,
                }
            )
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

    const handleSubmitCompanyEmployee = async (e) => {
        try {
            const response = await fetch('/api/employees', {
              method: "POST",
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify({
                Nombre: newEmployeeInfo.name,
                Cedula: newEmployeeInfo.id.toString(),
                Email: newEmployeeInfo.email,
                Telefono: newEmployeeInfo.phone.toString(),
                CedJuridica: companyID,
              }),
            });

            if (response.status === 200) {
                setShowModalCompany(false);
                setNewEmployeeInfo({ name: "", id: "", email: "", phone: "",});
                // append to employeesRow and projectsRow
                if (indexCompany === 0) {
                    setIndexCompany(employeesRow.length);
                }

                const newEmployee = {
                    id: indexCompany,
                    cedula: newEmployeeInfo.id,
                    name: newEmployeeInfo.name,
                    mail: newEmployeeInfo.email,
                    phone: newEmployeeInfo.phone,
                    projects: 0,
                    reports: 0,
                    button: handleSayHello,
                };

                setEmployeesRow([...employeesRow, newEmployee]);
                setProjectsRow([...projectsRow, newEmployee]);
                setIndexCompany(indexCompany + 1);
            }
          } catch (error) {
              console.error(error);
          }
    }

    return (
        <>
            <EmployeeDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
            <ModalCompanyEmployee employeeInfo={newEmployeeInfo} setEmployeeInfo={setNewEmployeeInfo} isOpen={showModalCompany} setIsOpen={setShowModalCompany} handleSubmit={handleSubmitCompanyEmployee} />
            <ModalProjectEmployee isOpen={showModalProject} setIsOpen={setShowModalProject} projectSelected={selectedProjectName} />
            <Sidebar
                selected={3}
                username={name}
                isEmployer={isEmployer}
            />
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
                    <Search placeholder="Buscar empleado..." />
                    <IconBox
                            action={() => (selectedProjectName === "Todos los proyectos" ? setShowModalCompany(true): setShowModalProject(true))}
                            isDisabled={selectedProjectName === ""}
                        >
                            <AddIcon fontSize="large" />
                    </IconBox>
                </div>
                <div className={Styles.cards}>
                    {
                        projectsRow && projectsRow.length > 0 ? (
                            isProjectSelected ? (
                                contractsOfProject.length > 0 ? <ProjectsTable rows={contractsOfProject} deleteEmployee={deleteEmployee} /> : <div className={Styles.main__noContracts}>No hay contrataciones para este proyecto</div>
                            ) : (
                                projectsRow.length > 0 ? <EmployeeTable rows={projectsRow} deleteEmployee={deleteEmployee} /> : <div className={Styles.main__noEmployees}>No hay empleados agregados aún</div>
                            )
                        ) : (
                                <div></div>
                        )
                    }
                    
                </div>
            </div>
        </>
    );
};

export default Employees;
