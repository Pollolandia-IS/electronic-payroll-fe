import styles from '../styles/RegisterCompanyForm.module.css';
import Button from './Button'
import Modal from './Modal'
import { useState } from 'react'

const RegisterCompanyInput = (props) => {
    const {label, onChange, errorMessage, id, ...inputProps} = props
    return(
        <div className={styles.RegisterCompanyInput}>
            <label className={styles.InputLabel}> {label} </label>
            <input className={styles.InputTextBox} {...inputProps}onChange={onChange}/>
            <span className={styles.ErrorMessage}> {errorMessage} </span>
        </div>
    );
};

const RegisterCompanyForm = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const [Values, setValues] = useState({
        name: "",
        businessname: "",
        legalid: "",
        physicaladdress: "",
        email: "",
        phone: "",
        website: "",
    });

    const inputsSectorOne = [
    {
        id: 1,
        name: "name",
        type: "text",
        label: "Nombre  *",
        required: true,
    },
    {
        id: 2,
        name: "legalid",
        type: "text",
        label: "Cédula Jurídica: *",
        required: true,
    },
    {
        id: 3,
        name: "businessname",
        type: "text",
        label: "Razón Social: *",
        required: true,
    },
    ];

    const inputsSectorTwo = [
    {
        id: 4,
        name: "physicaladdress",
        type: "text",
        label: "Dirección Física: *",
        required: true,
        maxlength: "60",
    },
    {
        id: 5,
        name: "phone",
        type: "text",
        label: "Teléfono: *",
        required: true,
        size: "8",
    },
    {
        id: 6,
        name: "email",
        type: "text",
        label: "Correo Electrónico: *",
        required: true,
    },
    {
        id: 7,
        name: "website",
        type: "text",
        label: "Página Web: ",
    },
    ];

    const openModal = () => {
        setModalOpened(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        openModal();
    }

    const onChange = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value });
        console.log(JSON.stringify(Values.Name))
    };

    const handleDataConfirmation = () => {

    }

    const handleCancel = () => {
        window.location.href='http://localhost:3000'
    }

    return(
        <div className={styles.formLayer}>
            <p className={styles.subtitle}> Ingresa los datos de tu Empresa </p>
            <form onSubmit={handleSubmit}>
                <p className={styles.Formsubtitle}> Datos de Empresa</p>
                {inputsSectorOne.map((input) => (
                    <RegisterCompanyInput
                        key={input.id}
                        {...input}
                        value={Values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <p className={styles.Formsubtitle}> Contacto de Empresa </p>
                {inputsSectorTwo.map((input) => (
                    <RegisterCompanyInput
                        key={input.id}
                        {...input}
                        value={Values[input.name]}
                        onChange={onChange}
                    />
                ))}
                
                <div className={styles.CancelButtonPosition}>
                    <Button BaseClass={"btn__medium"} SecundaryClass={"btn__medium__cancel"} handleClick={handleCancel} type="button" ButtonText="Cancelar"/>
                </div>

                <div className={styles.AcceptButtonPosition}>
                    <Button BaseClass={"btn__medium"} SecundaryClass={"btn__primaryColor"} type="submit" ButtonText="Enviar"/>
                </div>
            </form>
            <Modal title="Confirmar Datos" modalOpened={modalOpened} setModalOpened={setModalOpened}>
            <div className={styles.ModalContainer}>
                    <div>
                        <p className={styles.Formsubtitle} id={styles.SectionOne}> Datos de Empresa</p>
                        <div className={styles.ModalSubEntry}>
                            <p className={styles.InputText}> <b>Nombre: </b>{JSON.stringify(Values.name).slice(1, JSON.stringify(Values.name).length - 1)} </p>
                            <p className={styles.InputText}> <b>Cédula Jurídica: </b>{JSON.stringify(Values.legalid).slice(1, JSON.stringify(Values.legalid).length - 1)} </p>
                            <p className={styles.InputText}> <b>Razón Social: </b>{JSON.stringify(Values.businessname).slice(1, JSON.stringify(Values.businessname).length - 1)} </p>
                        </div>
                    </div>
                    <div>
                        <p className={styles.Formsubtitle} id={styles.SectionTwo}> Contacto de Empresa</p>
                        <div className={styles.ModalSubEntry}>
                            <p className={styles.InputText}> <b>Dirección Física: </b> {JSON.stringify(Values.physicaladdress).slice(1, JSON.stringify(Values.physicaladdress).length - 1)} </p>
                            <p className={styles.InputText}> <b>Correo Electrónico: </b> {JSON.stringify(Values.email).slice(1, JSON.stringify(Values.email).length - 1)}</p>
                        </div>
                        <div className={styles.ModalSubEntry}>
                            <p className={styles.InputText}> <b>Teléfono: </b> {JSON.stringify(Values.phone).slice(1, JSON.stringify(Values.phone).length - 1)}</p>
                            <p className={styles.InputText}> <b>Página Web: </b> {Values.Website ? JSON.stringify(Values.website).slice(1, JSON.stringify(Values.website).length - 1): "" }</p>
                        </div>
                    </div>

                    <div className={styles.ModalButtonPosition}>
                        <Button BaseClass={"btn__medium"} SecundaryClass={"btn__primaryColor"} type="button" handleClick={handleDataConfirmation} ButtonText="Confirmar"/>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RegisterCompanyForm;
