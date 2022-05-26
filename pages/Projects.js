import Aside from "../components/Aside";
import NavBar from "../components/NavBar";
import ProjectCard from "../components/projectCard";
import styles from "../styles/Projects.module.css";

const Projects = () => {
  const navItems = [
    ["Inicio", false, "/"],
    ["Proyectos", true, "/RegisterCompany"],
    ["Reportes", false, "/RegisterCompany"],
    ["Empleados", false, "/RegisterCompany"],
    ["Deducciones", false, "/RegisterCompany"],
    ["Beneficios", false, "/RegisterCompany"],
  ];

  const asideItems = [
      {
        name: 'Nómina',
        icon: 'payroll',
        dropDown: [],
      },
      {
        name: 'Ajustes',
        icon: 'config',
        dropDown: [],
      },
      {
        name: 'Historial',
        icon: 'history',
        dropDown: [],
      },
      {
        name: 'Perfil',
        icon: 'profile',
        dropDown: [],
      },
      {
        name: 'Cerrar Sesión',
        icon: 'logout',
      },
    ];

  return (
    <>
    <NavBar navItems={navItems} />
    <Aside items={asideItems}/>
    <main className={styles.main}>
        <ProjectCard
          id="1"
          name="Proyecto 1"
          userCount="10"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="2"
          name="Proyecto 2"
          userCount="20"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="3"
          name="Proyecto 3"
          userCount="30"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="4"
          name="Proyecto Integrador"
          userCount="30"
          currency="CRC"
          frequency="Semanal"
          startDate="01/01/2020 - 01/08/2022"
        />
                <ProjectCard
          id="1"
          name="Proyecto 1"
          userCount="10"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="2"
          name="Proyecto 2"
          userCount="20"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="3"
          name="Proyecto 3"
          userCount="30"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="4"
          name="Proyecto Integrador"
          userCount="30"
          currency="CRC"
          frequency="Semanal"
          startDate="01/01/2020 - 01/08/2022"
        />
    </main>
    </>
  );
}

export default Projects;
