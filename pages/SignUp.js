import Image from "next/image";
import Form from "../components/Form.js";
import NavBar from "../components/NavBar.js";
import styles from "../styles/SignUp.module.css";

function SignUp() {
    const navItems = [
        ["Inicio", false, "/"],
        ["Sobre Nosotros", false, "/"],
    ];
    //[title, type, isRequired, maxLength, pattern, helpText]
    const passwordHelpText =
        "Porfavor ingresar una constraseña con (por lo menos) una letra mayúscula, minúscula y un \
        número, tiene que ser (por lo menos) 10 carácteres de largo, por ejemplo: 'holaSAS123'";
    const titles = [
        [
            "Cedula",
            "text",
            true,
            "12",
            "[0-9]{9,12}",
            "Una combinación de 9 a 12 dígitos",
        ],
        ["Email", "email", true],
        [
            "Teléfono",
            "tel",
            true,
            "8",
            "[0-9]{8}",
            "Un número de teléfono válido, por ejemplo: '12345678'",
        ],
        ["Nombre", "text", true],
        [
            "Contraseña",
            "password",
            true,
            ,
            "[a-z-A-Z-0-9]{10,}",
            passwordHelpText,
        ],
        [
            "Confirmar Contraseña",
            "password",
            true,
            ,
            "[a-z-A-Z-0-9]{10,}",
            passwordHelpText,
        ],
    ];

    return (
        <>
            <NavBar navItems={navItems} />
            <div>
                <h1 className={styles.SignUp__title}>Ingresa tus datos:</h1>
                <h2 className={styles.SignUp__subtitle}>
                    Los campos con * son obligatorios.
                </h2>
            </div>
            <div>
                <Image
                    className={styles.SignUp__background}
                    alt="Background"
                    src="/Cuenta_Admin_Background.svg"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <img className={styles.SignUp__logo} src="Logo.svg" />
            </div>
            <Form titles={titles} button="Confirmar" />
            <footer className={styles.SignUp__footer}>
                <p className={styles.SignUp__footer__info}>
                    <span
                        className={`icon PL-telf ${styles.SignUp__footer__icons}`}
                    ></span>
                    Teléfono: (+506) 1234 - 5678
                    <br />
                    <span
                        className={`icon PL-mail ${styles.SignUp__footer__icons}`}
                    ></span>
                    Dirección electrónica: PLSolutions@PLS.co.cr
                    <br />
                </p>
            </footer>
        </>
    );
}

export default SignUp;
