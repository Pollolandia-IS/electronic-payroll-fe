import Aside from "../components/Aside";
import Navbar from "../components/Navbar.js";
import CardEmployee from "../components/CardEmployee.js";
import Styles from "/styles/Empleados.module.css";
import { prisma } from "/.db";
import SearchBar from "../components/SearchBar.js";
import { useState } from "react";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const ids = JSON.parse(res._headers.ids);
    const companyID = ids.companyId;

    const AsideItems = [
      {
        name: 'Empleados',
        icon: 'profile',
        dropDown: [['- Nuevo Empleado', `${companyID}/registerEmployeeModal`],],
      },
  ];

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
    }
    );

    return {
        props: {
            employees,
            companyID,
            AsideItems,
        },
    };
}
const Employees = ({ employees, companyID, AsideItems }) => {
    const navItems = [
      ["Inicio", false, `/`],
        ["Proyectos", false, `/project`],
        ["Registro Horas", false, "/hours"],
        ["Empleados", true, `/Employees`],
        ["Deducciones", false, "/deductions"],
        ["Beneficios", false, "/benefits"],
    ];

    const [searchText, setSearchText] = useState("");

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    };

    if (searchText) {
        employees = employees.filter(
            (e) =>
                e.nombre.toLowerCase().includes(searchText) ||
                e.nombre.toUpperCase().includes(searchText.toUpperCase()) ||
                e.cedula.toString().includes(searchText) ||
                e.telefono.toString().includes(searchText)
        );
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
