import Image from 'next/image';
import Form from '../../components/Form.js';
import NavBar from '../../components/NavBar.js';
import styles from '../../styles/CuentaAdmin.module.css';

function CuentaAdmin() {
    const navItems = [
        ["Inicio", false, "/"],
        ["Sobre Nosotros", false, "/"]
    ];

    return (
        <>
            <NavBar navItems={navItems}/>
            <div>
                <h1 className={styles.CA__h1}>Ingresa tus datos:</h1>
                <h2 className={styles.CA__h2}>Los campos con * son obligatorios.</h2>
            </div>
            <div>
                <Image className={styles.CA__backG__img}
                    alt="Background"
                    src="/Cuenta_Admin_Background.svg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <img className={styles.CA__img} src='Logo.svg'/>
            </div>
            <Form titles= {[["Cedula", "text", true], ["Email", "email", true], ["Teléfono", "tel", true], 
                ["Nombre", "text", true], ["Contraseña", "password", true], ["Confirmar Contraseña", "password", 
                    true]]} button = "Confirmar"/>
            <footer className={styles.CA__footer}>
                <p className={styles.CA__footer__p}>
                    <span className={`icon PL-telf ${styles.CA__footer__span}`}></span>Teléfono: (+506) 1234 - 5678<br/>
                    <span className={`icon PL-mail ${styles.CA__footer__span}`}></span>Dirección electrónica: PLSolutions@PLS.co.cr<br/>
                </p>
            </footer>
        </>
    );
}

export default CuentaAdmin;
