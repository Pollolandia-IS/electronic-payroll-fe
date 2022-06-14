import { useState, useEffect } from "react";
import Image from 'next/image';
import RegisterForm from '../../../components/RegisterForm.js';
import Modal from '../../../Components/Modal.js'
import NavBar from '../../../Components/NavBar.js';
import Aside from '../../../Components/Aside.js';
import styles from '../../../styles/AgregarEmpleados.module.css';

export async function getServerSideProps(context) {
  const { companyID} = context.params;
  return {
    props: {
      companyID,
    },
};
}

function AgregarEmpleados(companyID){
    const [modalOpened, setModalOpened] = useState(false);
    const openModal = () => {
        setModalOpened(true);
    }
    const AsideItems = [
        {
          name: 'Agregar Empleado',
          icon: 'profile',
          dropDown: [['- Nuevo Empleado', `/${JSON.stringify(companyID).slice(14,JSON.stringify(companyID).length-2)}/registerEmployeeModal`],],
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
                    ["Telefono", "tel", true]]} button="Enviar"> </RegisterForm>
            </Modal>    
            <footer className={styles.CA__footer}>
            </footer>
        
        </>
    );
}

export default AgregarEmpleados;