import Aside from "../../../../components/Aside.js";
import Navbar from "../../../../components/Navbar.js";
import HeaderEmployeeCard from "../../../../components/HeaderEmployeeCard.js";
import CardEmployee from "../../../../components/CardEmployee.js";
import Modal from "../../../../components/Modal.js";
import Styles from "/styles/AddEmployee.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "/.db";


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

export async function getServerSideProps(context) {
  const { companyID, project } = context.params;

  let employeesNotInThisProject = await prisma.esContratado.findMany({
    where: {
      nombreProyecto: project,
    },
    select: {
      cedulaEmpleado: true,
    },
  });

  let employees = (
    await prisma.empleado.findMany({where:{cedulaJuridica: companyID}, include: { persona: true } })
  )
    .filter((e) =>
      employeesNotInThisProject.every((ee) => ee.cedulaEmpleado != e.cedula)
    )
    .map((e) => e.persona);

  return {
    props: {
      employees,
      nombreProyecto: project,
      cedulaJuridica: companyID,
    },
  };
}

const AddEmployee = ({
  employees: employeesBD,
  nombreProyecto,
  cedulaJuridica,
}) => {

  const navItems = [
    ["Proyectos", true, `${cedulaJuridica}/project`],
    ["Reportes", false, "/reports"],
    ["Empleados", false, `${cedulaJuridica}/Employees`],
    ["Deducciones", false, "/deductions"],
    ["Beneficios", false, "/benefits"],
  ];

  const getCleanInputs = () => {
    return {
      montoPago: "",
      tipoEmpleado: "",
      puesto: "",
      fechaInicio: "",
      fechaFin: "",
      jornada: "",
    };
  };

  const [employees, setEmployees] = useState(
    employeesBD.map((u) => ({ cedula: u.cedula, checked: false }))
  );
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState(getCleanInputs);

  const router = useRouter();

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
        if (String(e.cedula) === name) {
          return { ...e, checked };
        } else {
          return e;
        }
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      ...formState,
      montoPago: parseInt(formState.montoPago),
      fechaInicio: `${formState.fechaInicio}T00:00:00Z`,
      fechaFin: `${formState.fechaInicio}T00:00:00Z`, fechaFin: `${formState.fechaFin}T00:00:00Z`};
      
    const selectedEmployees = filteredEmployees.map((e) => e.cedula);

    const response = await fetch("/api/addEmployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form, selectedEmployees, cedulaJuridica, nombreProyecto}),
    });
    setFormState(getCleanInputs());
    setModalOpen(false);
    router.push(`/${cedulaJuridica}/project/${nombreProyecto}`);
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredEmployees = employees.filter((e) => e.checked == true);
  const filteredEmployeesLength = filteredEmployees.length;

  if (searchText) {
    employeesBD = employeesBD.filter(
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

      <Modal
        title="Agregar Empleados"
        modalOpened={modalOpen}
        setModalOpened={setModalOpen}
      >
        <form className={Styles.form} onSubmit={handleSubmit}>
          <label className={Styles.label}>
            <span>Monto de pago: </span>
            <input
              value={formState.montoPago}
              onChange={handleInputChange}
              type="number"
              name="montoPago"
              required
            />
          </label>
          <label className={Styles.label}>
            <span>Tipo de Empleado: </span>
            <input
              value={formState.tipoEmpleado}
              onChange={handleInputChange}
              type="text"
              name="tipoEmpleado"
              required
            />
          </label>
          <label className={Styles.label}>
            <span>Puesto: </span>
            <input
              value={formState.puesto}
              onChange={handleInputChange}
              type="text"
              name="puesto"
              required
            />
          </label>
          <label className={Styles.label}>
            <span>Fecha de inicio: </span>
            <input
              value={formState.fechaInicio}
              onChange={handleInputChange}
              type="date"
              name="fechaInicio"
              required
            />
          </label>
          <label className={Styles.label}>
            <span>Fecha de finalizacion: </span>
            <input
              onChange={handleInputChange}
              value={formState.fechaFin}
              type="date"
              name="fechaFin"
              required
            />
          </label>
          <label className={Styles.label}>
            <span>Jornada: </span>
            <input
              onChange={handleInputChange}
              value={formState.jornada}
              type="text"
              name="jornada"
              required
            />
          </label>

          <input className={Styles.submit} type="submit" value="Agregar" />
        </form>
      </Modal>
      <h1 className={Styles.title}>Agregar Empleados</h1>
      <div className={Styles.container}>
        
        <div className={Styles.head}>
          <HeaderEmployeeCard
            isSelected={!filteredEmployeesLength}
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
              key={item.cedula}
              handleCheckbox={handleChange}
              checkedBoxValue={employees[item.cedula]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
