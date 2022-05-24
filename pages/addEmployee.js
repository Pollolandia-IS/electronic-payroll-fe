import Aside from "../components/Aside.js";
import Navbar from "../components/Navbar.js";
import HeaderEmployeeCard from "../components/HeaderEmployeeCard.js";
import CardEmployee from "../components/CardEmployee.js";
import Styles from "../styles/AddEmployee.module.css";
import { useState } from "react";

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

const userTest = [
  {
    name: "Juan Perez",
    salary: "$1,000,000",
    typeOfWork: "Administrador",
    date: "01/01/2020",
    srcImg: "/../public/assets/img/employee2.jpg",
  },
  {
    name: "Juan Ignacio",
    salary: "$1,000,000",
    typeOfWork: "Administrador",
    date: "01/01/2020",
    srcImg: "/../public/assets/img/employee2.jpg",
  },
  {
    name: "Juan Galeano",
    salary: "$1,000,000",
    typeOfWork: "Administrador",
    date: "01/01/2020",
    srcImg: "/../public/assets/img/employee2.jpg",
  },
  {
    name: "Juan Patricio",
    salary: "$1,000,000",
    typeOfWork: "Administrador",
    date: "01/01/2020",
    srcImg: "/../public/assets/img/employee2.jpg",
  },
  {
    name: "Juan Esponja",
    salary: "$1,000,000",
    typeOfWork: "Administrador",
    date: "01/01/2020",
    srcImg: "/../public/assets/img/employee2.jpg",
  },
];

const AddEmployee = () => {
  const [employees, setEmployees] = useState(userTest.map(u => ({name: u.name, checked: false})));

  const handleChange = (event) => {
    const { name, checked } = event.target;

    setEmployees(employees.map(e => {
      if(e.name === name) {
        return {...e, checked};
      } else {
        return e;
      }

    }))
  }
  const filteredEmployees = employees.filter(e => e.checked == true);
  const filteredEmployeesLength = filteredEmployees.length;


    return (
      <>
        <Navbar navItems={navItems} />
        <Aside items={AsideItems} />
        <div className={Styles.container}>
          <div className={Styles.head}>
            <HeaderEmployeeCard
              placeText="Buscar empleado"
              buttonText="Agregar Seleccion"
              textSecondary={`${filteredEmployeesLength} seleccionado${
                filteredEmployeesLength > 1 ? "s" : ""
              }`}
            />
          </div>
          <div className={Styles.cards}>
            {userTest.map((item, index) => (
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
