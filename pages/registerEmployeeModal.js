import { useState, useEffect } from "react";
import Image from 'next/image';
import RegisterForm from '../components/RegisterForm.js';
import Modal from '../Components/Modal.js'
import NavBar from '../Components/NavBar.js';
import Aside from '../Components/Aside.js';
import styles from '../styles/AgregarEmpleados.module.css';
import { Router } from "next/router";
function AgregarEmpleados(){
    const handleDataConfirmation = async(info) => {
      try {
        await fetch('/api/employees', {
          method: "POST",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(info),
        });
        await Router.push('/');
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
        Foto: event.target["Foto"].value
      }
      if (info) {
        const infoJSON = JSON.stringify(info);
        //todo: enviar a la base de datos
        console.log("Listo para enviar a la db")
        handleDataConfirmation(info)
      }
    }
    const [modalOpened, setModalOpened] = useState(true);
    const openModal = () => {
        setModalOpened(true);
    }
    const AsideItems = [
        {
          name: 'Agregar Empleado',
          icon: 'profile',
          dropDown: [['- Nuevo Empleado', '/AgregarEmpleados'],],
        },
        {
          name: 'Perfil',
          icon: 'profile',
          dropDown: [],
        },
        {
          name: 'Cerrar Sesión',
          icon: 'logout',
          dropDown: [],
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
                    ["Telefono", "tel", true], ["Foto", "file", true, true]]} button="Enviar" submitInfo={submitInfo}> </RegisterForm>
            </Modal>    
            <footer className={styles.CA__footer}>
            </footer>
        
        </>
    );
}

export default AgregarEmpleados;
