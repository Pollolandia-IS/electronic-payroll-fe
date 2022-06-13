import { prisma } from "/.db";
import HourTable from "../../../../../components/HourTable";
import HourModal from "../../../../../components/HourModal";
import Button from '@mui/material/Button';
import Styles from "/styles/AddHoursEmployee.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { employeeID, projectID } = context.params;
  const hours = await prisma.reporteHoras.findMany({
    where: {
      cedulaEmpleado: employeeID,
    },
  });
  
  let counter = 0;
  const hoursWithId = hours.map((h) => ({
    id: counter++,
    hours: h.horasTrabajadas,
    date: JSON.stringify(h.fechaHora).split("T")[0].substring(1),
    state: h.nombreProyecto,
  }));

  return {
    props: {
      hoursWithId,
      nombreProyecto: projectID,
      cedulaEmpleado: employeeID,
    },
  };
}

const AddHoursEmployee = ({nombreProyecto,cedulaEmpleado, hoursWithId}) => {
  const [showModal, setShowModal] = useState(false);
  const [hours, setHoursState] = useState(0);
  const [date, setDateState] = useState('2022-10-08 00:00:00');
  const router = useRouter();

  const handleHoursChange = (event) => {
    setHoursState(event.target.value);
  }

  const handleDateChange = (event) => {
    if(event){
      setDateState(event.toISOString().slice(0, 19).replace('T', ' '));
    }
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/addHoursEmployee', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: cedulaEmpleado,
        projectID: nombreProyecto,
        hours,
        date,
      }),
    });
    setShowModal(false);
    router.push(`/employee/${cedulaEmpleado}/project/${nombreProyecto}/addHoursEmployee`);
  }

  return (
    <>
    <div className={Styles.container}>
      <HourTable rows={hoursWithId} />
      <div className={Styles.buttonContainer}>
        <Button onClick={setShowModal} sx={{width: '187px', height: '42px'}} variant="contained">Agregar reporte</Button>
      </div>
    </div>
      <HourModal date={date} handleDate={handleDateChange} hours={hours} handleHours={handleHoursChange} employeeID={cedulaEmpleado} project={nombreProyecto} isOpen={showModal} setIsOpen={setShowModal} handleSubmit={handleSubmit} />
      
    </>
  );
};

export default AddHoursEmployee;
