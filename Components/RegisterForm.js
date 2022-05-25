import { useState, useEffect } from "react";
import styles from '../styles/RegisterForm.module.css';
const RegisterForm = (props) => {
    return (
        <>
            <form className={styles.RegisterForm}>
                {props.titles.map(([title, type, isRequired]) => (
                    <>
                        <input className={styles.Form__input} type={type} name={title} placeholder={title} required={isRequired} />
                        <hr className={styles.Form__border} />
                    </>
                ))}
                <button className={styles.Form__button} type="Submit">{props.button}</button>
            </form>
        </>
    );
}
export default RegisterForm;
