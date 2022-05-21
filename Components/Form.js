import { useState, useEffect } from "react";
import styles from '../styles/Form.module.css';

const Form = (props) => {
    //TODO: create method that handles the response
    return (
        <>
            <form className={styles.Form}>
                {props.titles.map(([title, type, required]) => (
                    <>
                        <label className={styles.Form__label} htmlFor={title}>{title} *</label>
                        <input className={styles.Form__input} type={type} name={title} required={required} /><br />
                    </>
                ))}
                <button className={styles.Form__button} type="Submit">{props.button}</button>
            </form>
        </>
    );
}

export default Form;
