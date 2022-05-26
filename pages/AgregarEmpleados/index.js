import { useState, useEffect } from "react";
import Image from 'next/image';
import RegisterForm from '../../components/RegisterForm.js';
import Modal from '../../Components/Modal.js'
import NavBar from '../../Components/NavBar.js';
import styles from '../../styles/AgregarEmpleados.module.css';

function AgregarEmpleados(){
    const [modalOpened, setModalOpened] = useState(false);
    const openModal = () => {
        setModalOpened(true);
    }
    return(
        /*<button className={styles.Form__button} type="Submit"><span className="icon PL-arrow"></span> {props.button}</button>*/
        <>
            <header>
                <nav className={styles.AE__nav}>
                    <ul className={styles.AE__nav__ul}>
                        <li><img className={styles.AE__nav__li} src='Logo_Icon.svg'/></li>
                        <li className={styles.AE__nav__li}><a href='#'>Inicio</a></li>
                        <li className={styles.AE__nav__li}><a href='#'>Proyectos</a></li>
                        <li className={styles.AE__nav__li}><a href='#'>Reportes</a></li>
                        <li className={styles.AE__nav__li}><a href='#'>Empleados</a></li>
                        <li className={styles.AE__nav__li}><a href='#'>Deducciones</a></li>
                        <li className={styles.AE__nav__li}><a href='#'>Beneficios</a></li>
                    </ul>
                </nav>
            </header>
            <button className={styles.button} onClick={openModal}> Agregar Empleado</button>
            <Modal title="Agregar empleado" modalOpened={modalOpened} setModalOpened ={setModalOpened}>
                <RegisterForm titles= {[["Nombre del empleado", "text", true], ["Cédula", "text", true], ["Email", "email", true], 
                    ["Telefono", "tel", true], ["Foto", "file", true, true]]} button="Enviar"> </RegisterForm>
            </Modal>    
            <footer className={styles.CA__footer}>
            </footer>
        
        </>
    );
}

export default AgregarEmpleados;