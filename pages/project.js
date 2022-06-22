import Sidebar from "../components/Sidebar";
import Aside from "/components/Aside";
import NavBar from "/components/NavBar";
import ProjectCard from "/components/ProjectCard";
import styles from "/styles/Projects.module.css";
import { useState } from "react";
import Search from "../components/Search";
import IconBox from "../components/IconBox";
import AddIcon from '@mui/icons-material/Add';
import {prisma} from "/.db";
import safeJsonStringify from 'safe-json-stringify';
import NewProjectModal from "../components/NewProjectModal";
import jwt from "jsonwebtoken";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const { cookies } = req;
  const ids = JSON.parse(res._headers.ids);
  const {userData} = jwt.verify(cookies.token, process.env.JWT_SECRET);

  let projects = await prisma.proyecto.findMany({
    where: {
      cedulaJuridica: ids.companyId,
    },
    include: {
      _count: {
        select: {
          esContratado: true,
        },
      },
    },
  });
  const projectsString = JSON.parse(safeJsonStringify(projects));

  return {
    props: {
      companyID: ids.companyId,
      projectsString,
      name: userData.name,
      isEmployer: userData.isEmployer,
    },
  };
}

const Projects = ({companyID, projectsString, name, isEmployer}) => {
  const [isOpen, setIsOpen] = useState(false);

  const convertDate = (date) => {
    let dateArray = date.split("-");
    dateArray[2] = dateArray[2].split("T")[0];
    let newDate = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    return newDate;
  }

  const getProjects = () => {
    return projectsString.map(project => {
      return <ProjectCard key={project.nombre} projects={projectsString} companyID={project.cedulaJuridica} name={project.nombre}
        employeeCount={project._count.esContratado} maxBen={project.cantidadMaximaBeneficios}
        maxAmountBen={project.montoMaximoBeneficio} currency={project.moneda}
        frequency={project.frecuenciaPago} date={convertDate(project.fechaInicio)} />
    });
  }
  
  const getRows = () => {
    let rows = [];
    const projects = getProjects();
    for (let i = 0; i < projects.length; i += 2) {
      rows.push(
        <div key={i} className={styles.main__row}>
          {projects[i]}
          {projects[i + 1]}
        </div>
      );
    }
    return rows;
  }
  


  return (
    <>
    <NewProjectModal isOpen={isOpen} setIsOpen={setIsOpen} companyID={companyID}/>
    <Sidebar selected={2} username={name} isEmployer={isEmployer} />
    <main className={styles.main}>
      <div className={styles.main__header}>
        <Search placeholder="Buscar proyecto..."/>
        <IconBox action={() => setIsOpen(true)} ><AddIcon fontSize="large" /></IconBox>
      </div>
      <div className={styles.main__content}>
        {getRows()}
      </div>
    </main>
    </>
  );
}

export default Projects;
