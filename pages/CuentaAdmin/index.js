import Image from 'next/image';
import Form from '../../components/Form.js';
import NavBar from '../../components/NavBar.js';
import styles from '../../styles/CuentaAdmin.module.css';



function CuentaAdmin() {
    //TODO: add info in Footer
    //TODO: fix gradient of the footer
    const navItems = [
        ["Inicio", false, "/"],
        ["Sobre Nosotros", false, "/"]
    ];
    return (
        <>
            <header className={styles.CA__header}>
                <NavBar navItems={navItems}/>
                <h1 className={styles.CA__h1}>Ingresa tus datos:</h1>
                <h2 className={styles.CA__h2}>Los campos con * son obligatorios.</h2>
            </header>
            <div>
                <Image className={styles.CA__BackG__img}
                    alt="Background"
                    src="/Cuenta_Admin_Background.svg"
                    layout="fill"
                    objectFit="contain"
                    quality={100}
                />
                <img className={styles.CA__img} src='Logo.svg'/>
            </div>
            <Form titles= {[["Cedula", "text", true], ["Email", "email", true], ["Teléfono", "tel", true], 
                ["Nombre", "text", true], ["Contraseña", "password", true], ["Confirmar Contraseña", "password", 
                    true]]} button = "CONFIRMAR"/>
            <footer className={styles.CA__footer}>

            </footer>
        </>
    );
}

export default CuentaAdmin;
