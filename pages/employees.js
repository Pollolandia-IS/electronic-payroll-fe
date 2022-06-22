import Aside from "../components/Aside";
import Navbar from "../components/Navbar.js";
import CardEmployee from "../components/CardEmployee.js";
import Styles from "/styles/Empleados.module.css";
import { prisma } from "/.db";
import SearchBar from "../components/SearchBar.js";
import { useState } from "react";

const AsideItems = [
  {
    name: "Nómica",
    icon: "payroll",
    dropDown: [],
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


export async function getServerSideProps(context) {
  const { req, res } = context;
  const { cookies } = req;
  const ids = JSON.parse(res._headers.ids);
  const companyID = ids.companyId;

  let employees = (
    await prisma.empleado.findMany({
      where: { cedulaJuridica: companyID },
      include: { persona: true },
    })
  ).map((e) => e.persona);

  return {
    props: {
      employees,
      companyID
    },
  };
}
const Employees = ({ employees, companyID }) => {

  const navItems = [
    ["Proyectos", false, `/${companyID}/project`],
    ["Reportes", false, "/reports"],
    ["Empleados", true, `/${companyID}/Employees`],
    ["Deducciones", false, "/deductions"],
    ["Beneficios", false, "/benefits"],
  ];

  const [searchText, setSearchText] = useState("");

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  console.log(employees)

  if (searchText) {
    employees = employees.filter(
      (e) =>
        e.nombre.toLowerCase().includes(searchText) ||
        e.nombre.toUpperCase().includes(searchText.toUpperCase()) || e.cedula.toString().includes(searchText) || e.telefono.toString().includes(searchText));
  }

  return (
    <>
      <Navbar navItems={navItems} />
      <Aside items={AsideItems} />
      <div className={Styles.container}>
        <h1 className={Styles.title}>Empleados</h1>
        <SearchBar
          handleChange={handleTextChange}
          searchText={searchText}
          placeholder={"Buscar Empleados"}
        />
        <div className={Styles.cards}>
          {employees.map((item, index) => (
            <CardEmployee
              cardItems={item}
              key={item.cedula}
              removeCheckbox={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Employees;
