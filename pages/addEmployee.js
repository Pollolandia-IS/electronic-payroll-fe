import Aside from "../components/Aside.js";
import Navbar from "../components/Navbar.js";
import HeaderEmployeeCard from "../components/HeaderEmployeeCard.js";
import CardEmployee from "../components/CardEmployee.js";
import Modal from "../components/Modal.js";
import Styles from "../styles/AddEmployee.module.css";
import { useState } from "react";
import {prisma} from '../.db';

const AsideItems = [
    {
        name: "Nómica",
        icon: "payroll",
        dropDown: [["- Crear Proyecto", "/projects/create"]],
    },
    {
        name: "Ajustes",
        icon: "config",
        dropDown: [],
    },
    {
        name: "Historial",
        icon: "history",
        dropDown: [],
    },
];

const navItems = [
    ["Inicio", false, "/"],
    ["Proyectos", true, "/projects"],
    ["Reportes", false, "/reports"],
    ["Empleados", false, "/employees"],
    ["Deducciones", false, "/deductions"],
    ["Beneficios", false, "/benefits"],
];

function logSubmit(event){
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(document.forms);
}

import { useRouter } from "next/router";
export async function getServerSideProps(context){ 
                                                  
  //console.log(context);



  if(!context.query.project) {
      return {
          props: {
              employees: []
          }
      }
  }

  let employeesNotInThisProject = (await prisma.esContratado.findMany(
      {
          where: {
            nombreProyecto: context.query.project
          },
          select: {
            cedulaEmpleado: true,
          }
      }
));

let employees = (await prisma.empleado.findMany({include: {persona: true}})).filter(e => employeesNotInThisProject.every(ee => ee.cedulaEmpleado != e.cedula)).map((e) => e.persona);

  return {
    props: {
      employees,
    },
  };
}

const AddEmployee = ({employees: employeesBD}) => {

    const router = useRouter();
    console.log(router.query);

  const [employees, setEmployees] = useState(
    employeesBD.map((u) => ({ name: u.nombre, checked: false }))
  );
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;

    setEmployees(
      employees.map((e) => {
        if (e.name === name) {
          return { ...e, checked };
        } else {
          return e;
        }
      })
    );
  };
  //post
  const filteredEmployees = employees.filter((e) => e.checked == true);
  const filteredEmployeesLength = filteredEmployees.length;

  if (searchText) {
    employeesBD = employeesBD.filter(
      (e) =>
        e.nombre.toLowerCase().includes(searchText) ||
        e.nombre.toUpperCase().includes(searchText.toUpperCase())
    );
  }

  return (
    <>
      <Navbar navItems={navItems} />
      <Aside items={AsideItems} />

      <Modal
        title="Agregar Empleados"
        modalOpened={modalOpen}
        setModalOpened={setModalOpen}
      >
        <form className={Styles.form}>
          <label className={Styles.label}>
            <span>Monto de pago: </span>
            <input type="number" id="mPago" required />
          </label>
          <label className={Styles.label}>
            <span>Tipo de Empleado: </span>
            <input type="text" id="tEmpleado" required />
          </label>
          <label className={Styles.label}>
            <span>Puesto: </span>
            <input type="text" id="puesto" required />
          </label>
          <label className={Styles.label}>
            <span>Fecha de inicio: </span>
            <input type="date" id="fInicio" required />
          </label>
          <label className={Styles.label}>
            <span>Fecha de finalizacion: </span>
            <input type="date" id="fFinal" required />
          </label>
          <label className={Styles.label}>
            <span>Jornada: </span>
            <input type="text" id="jornada" required />
          </label>
          <input className={Styles.submit} type="submit" value="Agregar" />
        </form>
      </Modal>

      <div className={Styles.container}>
        <div className={Styles.head}>
          <HeaderEmployeeCard
            searchText={searchText}
            handleTextChange={handleTextChange}
            handleOpenModal={handleOpenModal}
            placeText="Buscar empleado"
            buttonText="Agregar Seleccion"
            textSecondary={`${filteredEmployeesLength} seleccionado${
              filteredEmployeesLength > 1 ? "s" : ""
            }`}
          />
        </div>
        <div className={Styles.cards}>
          {employeesBD.map((item, index) => (
            <CardEmployee
              cardItems={item}
              key={index}
              handleCheckbox={handleChange}
              checkedBoxValue={employees[item.name]}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default AddEmployee;
