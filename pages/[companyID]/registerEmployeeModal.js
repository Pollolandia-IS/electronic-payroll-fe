import { useState, useEffect } from "react";
import Image from 'next/image';
import RegisterForm from '../../components/RegisterForm.js';
import Modal from '../../components/Modal.js'
import NavBar from '../../components/NavBar.js';
import Aside from '../../components/Aside.js';
import styles from '../../styles/AgregarEmpleados.module.css';
import Router from "next/router";

export async function getServerSideProps(context) {
  const { companyID} = context.params;
  return {
    props: {
      companyID,
    },
};
}

function AgregarEmpleados({companyID}){
    const handleDataConfirmation = async(info) => {
      try {
        await fetch('/api/employees', {
          method: "POST",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(info),
        });
      } catch (error) {
          console.error(error);
      }
    }
    const submitInfo = async (event) => {
      event.preventDefault();
      const info = {
        Nombre: event.target["Nombre del empleado"].value,
        Cedula: event.target["Cédula"].value,
        Email: event.target["Email"].value,
        Telefono: event.target["Telefono"].value,
        CedJuridica: companyID,
      }
      if (info) {
        const infoJSON = JSON.stringify(info);
        handleDataConfirmation(info)
      }
      Router.push("/employees");
    }
    const [modalOpened, setModalOpened] = useState(true);
    const openModal = () => {
        setModalOpened(true);
    }

    const AsideItems = [
        {
          name: 'Empleados',
          icon: 'profile',
          dropDown: [['- Ver Empleados', `/employees`],],
        },
      ];
      
      const navItems = [
        ["Inicio", false, "/"],
        ["Proyectos", false, "/projects"],
        ["Reportes", false, "/reports"],
        ["Empleados", true, "/employees"],
        ["Deducciones", false, "/deductions"],
        ["Beneficios", false, "/benefits"],
      ];
    
    return(
        /*<button className={styles.Form__button} type="Submit"><span className="icon PL-arrow"></span> {props.button}</button>*/
        <>
            <NavBar navItems={navItems}></NavBar>
            <Aside items={AsideItems}></Aside>
            <button className={styles.button} onClick={openModal}> Agregar Empleado</button>
            <Modal title="Agregar empleado" modalOpened={modalOpened} setModalOpened ={setModalOpened}>
                <RegisterForm titles= {[["Nombre del empleado", "text", true], ["Cédula", "text", true], ["Email", "email", true], 
                    ["Telefono", "tel", true]]} button="Enviar" submitInfo={submitInfo}> </RegisterForm>
            </Modal>    
            <footer className={styles.CA__footer}>
            </footer>
        
        </>
    );
}

export default AgregarEmpleados;
