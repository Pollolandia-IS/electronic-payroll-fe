import Image from 'next/image';
import Form from '../../components/Form.js';
import styles from '../../styles/CuentaAdmin.module.css';

function CuentaAdmin() {
    //TODO: add NavBar (the component)
    //TODO: add links for "Inicio" and "Sobre Nosotros" 
    //TODO: add info in Footer
    //TODO: fix gradient of the footer
    return (
        <>
            <header>
                <nav className={styles.CA__nav}>
                    <ul className={styles.CA__nav__ul}>
                        <li><img className={styles.CA__nav__li} src='Logo_Icon.svg'/></li>
                        <li className={styles.CA__nav__li}><a href='#'>Inicio</a></li>
                        <li className={styles.CA__nav__li}><a href='#'>Sobre Nosotros</a></li>
                    </ul>
                </nav>
                <h1 className={styles.CA__h1}>Ingresa tus datos:</h1>
                <h2 className={styles.CA__h2}>Los campos con * son obligatorios.</h2>
            </header>
            <div>
                <Image
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
                    true]]} button = "CONFIRMAR"/>
            <footer className={styles.CA__footer}>

            </footer>
        </>
    );
}

export default CuentaAdmin;
