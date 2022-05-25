import { useState, useEffect } from "react";
import styles from '../styles/RegisterForm.module.css';
import NavForm from './NavForm.js';
const RegisterForm = (props) => {
    return (
        <>
                {props.titles.map(([title, type, isRequired]) => (
                    <>
                        <input className={styles.Form__input} type={type} name={title} placeholder={title} required={isRequired} />
                        <hr className={styles.Form__border} />
                    </>
                ))}
        </>
    );
}
export default RegisterForm;
