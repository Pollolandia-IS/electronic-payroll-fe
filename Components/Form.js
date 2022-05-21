import { useState, useEffect } from "react";
import Styles from '../styles/Form.module.css';

function Form(props) {
    //TODO: create method that handles the response
    return (
        <>
            <form className={Styles.Form}>
                {props.titles.map(([title, type]) => (
                    <>
                        <label className={Styles.Form__label} htmlFor={title}>{title} *</label>
                        <input className={Styles.Form__input} type={type} name={title} id={title} required /><br />
                    </>
                ))}
                <button className={Styles.Form__button} type="Submit">{props.button}</button>
            </form>
        </>
    );
}

export default Form;
