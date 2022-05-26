import { useState, useEffect } from "react";
import styles from '../styles/Form.module.css';
import Modal from '../components/Modal.js';

const Form = (props) => {
    const [submitted, setSubmittedTrue] = useState(false);
    const verifySubmittedInfo = () => {
        setSubmittedTrue(true);
    };

    const [passwords, setPasswordsTrue] = useState(true);
    const unVerifyPasswords = () => {
        setPasswordsTrue(false);
    };
    const verifyPasswords = () => {
        setPasswordsTrue(true);
    };
    
    const [modalOpened, setModalOpened] = useState(false);
    const openModal = () => {
        setModalOpened(true);
    };

    const submitInfo = async (event) => {
        event.preventDefault();
        const info = {
            Cedula: event.target.Cedula.value,
            Email: event.target.Email.value,
            Teléfono: event.target.Teléfono.value,
            Nombre: event.target.Nombre.value,
            Contraseña: event.target.Contraseña.value,
            ConfirmarContraseña: event.target["Confirmar Contraseña"].value
        }
        if (info) {
            if (info.Contraseña == info.ConfirmarContraseña) {  
                if(!passwords) {
                    verifyPasswords();
                }  
                verifySubmittedInfo();
                const infoJSON = JSON.stringify(info);
                //TODO: Send submitted info to DB
            } else {
                unVerifyPasswords();
            }
        }
    };

    return (
        <>
            <form className={styles.Form} onSubmit={submitInfo}>
                {props.titles.map(([title, type, isRequired, max, pattern, helpText]) => (
                    <>
                        <label className={styles.Form__label} htmlFor={title}>{`${title} ${isRequired ? "*" : ""}`}</label>
                        <input className={styles.Form__input} type={type} name={title} required={isRequired} 
                            maxLength={max} pattern={pattern} title={`${helpText ? helpText : ""}`}/><br />
                    </>
                ))}
                <button className={styles.Form__button} onClick={openModal} type="Submit">{props.button}</button>
                {submitted &&
                    <Modal title = "Registro Exitoso" modalOpened = {modalOpened} setModalOpened = {setModalOpened}>
                        <div className={styles.Form__modal__info}>
                            <p>
                                Hemos comprobado tus datos y todo parece estar en orden, 
                                se ha creado tu cuenta de administrador.
                            </p>
                        </div>
                    </Modal>
                }
                {!passwords &&
                    <Modal title = "ERROR" modalOpened = {modalOpened} setModalOpened = {setModalOpened}>
                        <div className={styles.Form__modal__info}>
                            <p>
                                Porfavor compruebe que la contraseña ingresada sea correcta en ambos cuadros.
                            </p>
                        </div>
                    </Modal>
                }
            </form>
        </>
    );
}

export default Form;
