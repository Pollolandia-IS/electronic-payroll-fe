import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import CardProject from "../../Components/CardProject";
import Styles from "../../styles/Proyectos.module.css";

const projects = [
  {
    id: 1,
    numberOfEmploys: 99,
    moneda: 'USD',
    state: 'Pendiente',
    salary: 100000000,
    frecuency: 'Mensual',
    startDate: '01/01/2020',
    endDate: '01/01/2021',
    typeOfContract: 'Servicios Profesionales'
  },
  {
    id: 2,
    numberOfEmploys: 99,
    moneda: 'USD',
    state: 'Pendiente',
    salary: 100000000,
    frecuency: 'Mensual',
    startDate: '01/01/2020',
    endDate: '01/01/2021',
    typeOfContract: 'Empleados tiempo completo'
  },
  {
    id: 3,
    numberOfEmploys: 99,
    moneda: 'USD',
    state: 'Pendiente',
    salary: 100000000,
    frecuency: 'Mensual',
    startDate: '01/01/2020',
    endDate: '01/01/2021',
    typeOfContract: 'Empleados por hora'
  },
  {
    id: 3,
    numberOfEmploys: 99,
    moneda: 'USD',
    state: 'Pendiente',
    salary: 100000000,
    frecuency: 'Mensual',
    startDate: '01/01/2020',
    endDate: '01/01/2021',
    typeOfContract: 'Empleados por hora'
  },
  {
    id: 3,
    numberOfEmploys: 99,
    moneda: 'USD',
    state: 'Pendiente',
    salary: 100000000,
    frecuency: 'Mensual',
    startDate: '01/01/2020',
    endDate: '01/01/2021',
    typeOfContract: 'Empleados por hora'
  },
  {
    id: 3,
    numberOfEmploys: 99,
    moneda: 'USD',
    state: 'Pendiente',
    salary: 100000000,
    frecuency: 'Mensual',
    startDate: '01/01/2020',
    endDate: '01/01/2021',
    typeOfContract: 'Empleados por hora'
  },
]

const Proyectos = () => {
  return (
    <div className={Styles.proyectos}>
      <div>
        <Navbar />
      </div>
      <div className={Styles.centerContent}>
        <Sidebar />
        <div className={Styles.proyectoBody}>
          <div className={Styles.proyectoBodyTable}>
              {projects.map((project) => (
                  <CardProject projects={project} key={project.id}/>
              ))}
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Proyectos;