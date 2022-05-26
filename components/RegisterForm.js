import { useState, useEffect } from "react";
import styles from '../styles/RegisterForm.module.css';
const RegisterForm = (props) => {
    return (
        <>
            <form className={styles.RegisterForm} onSubmit={props.submitInfo}>
                {props.titles.map(([title, type, isRequired, isFile]) => (
                    <div>
                        {isFile ? (
                            <div>
                                <input id="fileInput" className={styles.Form__input__file} type={type} name={title} placeholder={title} required={isRequired} title= "" />
                                <label className={styles.Form__label__file} placeholder={title} htmlFor="fileInput">Foto</label>
                                <hr className={styles.Form__border} />
                            </div>
                        ) : (
                            <div>
                                <input className={styles.Form__input} type={type} name={title} placeholder={title} required={isRequired} />
                                <hr className={styles.Form__border} />
                            </div>)}
                    </div>
                ))}
                <button className={styles.Form__button} type="submit">{props.button}</button>
            </form>
        </>
    );
}
export default RegisterForm;
