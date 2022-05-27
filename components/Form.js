import { useState, useEffect } from "react";
import styles from '../styles/Form.module.css';
import Modal from '../components/Modal.js';
import Router from "next/router";

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

    const submitInfo = (event) => {
        event.preventDefault();
        const info = {
            id: event.target.Cedula.value,
            email: event.target.Email.value,
            phoneNumber: event.target.Teléfono.value,
            name: event.target.Nombre.value,
            password: event.target.Contraseña.value,
            confirmPassword: event.target["Confirmar Contraseña"].value,
        };
        if (info) {
            if (info.password == info.confirmPassword) {  
                if(!passwords) {
                    verifyPasswords();
                };  
                verifySubmittedInfo();
                sendData(info);
            } else {
                unVerifyPasswords();
            };
        };
    };

    const sendData = async (info) => {
        const idParam = info.id;
        const dataForDB = {
            id: info.id,
            email: info.email,
            phoneNumber: info.phoneNumber,
            name: info.name,
            password: info.password,
        };
        try {
            await fetch ('/api/employer', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataForDB),
            });
            await Router.push(`/employer/${idParam}/RegisterCompany`);
        } catch (error) {
            console.error(error);
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
