import Image from 'next/image';
import Form from '../components/Form.js';
import NavBar from '../components/NavBar.js';
import styles from '../styles/SignUp.module.css';

function SignUp() {
    const navItems = [
        ["Inicio", false, "/"],
        ["Sobre Nosotros", false, "/"]
    ];
    const titles = [
        ["Cedula", "text", true], 
        ["Email", "email", true], 
        ["Teléfono", "tel", true], 
        ["Nombre", "text", true], 
        ["Contraseña", "password", true], 
        ["Confirmar Contraseña", "password", true]
    ]

    return (
        <>
            <NavBar navItems={navItems}/>
            <div>
                <h1 className={styles.SignUp__title}>Ingresa tus datos:</h1>
                <h2 className={styles.SignUp__subtitle}>Los campos con * son obligatorios.</h2>
            </div>
            <div>
                <Image className={styles.SignUp__background}
                    alt="Background"
                    src="/Cuenta_Admin_Background.svg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <img className={styles.SignUp__logo} src='Logo.svg'/>
            </div>
            <Form titles= {titles} button = "Confirmar"/>
            <footer className={styles.SignUp__footer}>
                <p className={styles.SignUp__footer__info}>
                    <span className={`icon PL-telf ${styles.SignUp__footer__icons}`}></span>
                    Teléfono: (+506) 1234 - 5678<br/>
                    <span className={`icon PL-mail ${styles.SignUp__footer__icons}`}></span>
                    Dirección electrónica: PLSolutions@PLS.co.cr<br/>
                </p>
            </footer>
        </>
    );
}

export default SignUp;
