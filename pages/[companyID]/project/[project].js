import styles from "/styles/Project.module.css";
import NavBar from "/components/NavBar";
import Aside from "/components/Aside";
import {prisma} from "/.db";
import safeJsonStringify from 'safe-json-stringify';

export async function getServerSideProps(context) {
  const { companyID, project } = context.params;

  let rawData = await prisma.proyecto.findMany({
    where: {
      cedulaJuridica: parseInt(companyID),
      nombre: project,
    },
  });
  let companyData = await prisma.empresa.findMany({
    where: {
      cedulaJuridica: parseInt(companyID),
    },
  });
  const projectData = JSON.parse(safeJsonStringify(rawData));
  return {
    props: {
      companyID,
      project,
      projectData,
      companyData,
    },
};
}

const Project = ({projectData, companyData, companyID, project}) => {
  console.log(companyData);

  const navItems = [
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
      dropDown: [
        ['+ Agregar Empleado', `/${companyID}/project/${project}/addEmployee`],
      ],
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
      <Aside items={asideItems} />
      <main className={styles.main}>
        <section className={styles.project}>
          <h2 className={styles.title}>Proyecto: {projectData[0].nombre}</h2>
          <p className={styles.project__text}>Empresa Asociada: <span>{companyData[0].razonSocial}</span></p>
          <p className={styles.project__text}>Cantidad Máxima de Beneficios: <span>{projectData[0].cantidadMaximaBeneficios}</span></p>
          <p className={styles.project__text}>Moneda: <span>{projectData[0].moneda}</span></p>
          <p className={styles.project__text}>Frecuencia de Pago: <span>{projectData[0].frecuenciaPago}</span></p>
          <p className={styles.project__text}>Fecha de Inicio: <span>{projectData[0].fechaInicio.split("T")[0]}</span></p>
          <p className={styles.project__text}>Salario neto total: <span>Por Calcular</span></p>
        </section>
      </main>
    </>
  );
};
export default Project;
