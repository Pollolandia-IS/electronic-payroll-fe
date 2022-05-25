import styles from '../styles/RegisterCompanyForm.module.css';
import Router from 'next/router'
import Button from './Button'
import Modal from './Modal'
import { useState } from 'react'

const RegisterCompanyInput = (props) => {

    const handleChange = (e) => {
        props.handleChange(e.target.id,e.target.value);
    }

    return(
        <div className={styles.InputElement}>
            <label className={styles.InputLabel} forhtml={props.name}>  {props.tag} </label>
            <input className={styles.InputTextBox} type={props.type} id={props.name}
                required={props.required} onChange={handleChange}/>
        </div>
    );
}

const RegisterCompanyForm = () => {
    const initialValues = {Name: "", BusinessName: "", LegalId: "", PhysicalAddress:"", Email:"", Phone:"", Website:""}

    const [modalOpened, setModalOpened] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);

    const openModal = () => {
        setModalOpened(true)
    }

    const handleChange = (id,value) =>{
        setFormValues({...formValues, [id]: value});
    }

    const handleSubmit = () => {

    }

    return(
        <div className={styles.formLayer}>
            <p className={styles.subtitle}> Ingresa los datos de tu Empresa </p>
            <form>
                <p className={styles.Formsubtitle}> Datos de Empresa</p>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="Name" type="text" tag="Nombre: *" required={true} handleChange={handleChange}/>
                    <RegisterCompanyInput name="BusinessName" type="text" tag="Razón Social: *" required={true} handleChange={handleChange}/>
                </div>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="LegalId" type="text" tag="Cédula Jurídica: *" required={true} handleChange={handleChange}/>
                </div>

                <p className={styles.Formsubtitle}> Contacto de Empresa </p>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="PhysicalAddress" type="text" tag="Dirección Física: *" required={true} handleChange={handleChange} />
                    <RegisterCompanyInput name="Email" type="text" tag="Correo Electrónico: *" required={true} handleChange={handleChange}/>
                </div>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="Phone" type="text" tag="Teléfono: *" required={true} handleChange={handleChange}/>
                    <RegisterCompanyInput name="Website" type="text" tag="Página Web:" required={false} handleChange={handleChange}/>
                </div>

                <div className={styles.CancelButtonPosition}>
                    <Button BaseClass={"btn__medium"} SecundaryClass={"btn__medium__cancel"} type="button" ButtonText="Cancelar"/>
                </div>

                <div className={styles.AcceptButtonPosition}>
                    <Button BaseClass={"btn__medium"} SecundaryClass={"btn__primaryColor"} type="button" handleClick={openModal} ButtonText="Enviar"/>
                </div>
            </form>
            
            <Modal title="Confirmar Datos" modalOpened={modalOpened} setModalOpened={setModalOpened}>
                <div className={styles.ModalContainer}>
                    <div>
                        <p className={styles.Formsubtitle} id={styles.SectionOne}> Datos de Empresa</p>
                        <div className={styles.ModalSubEntry}>
                            <p className={styles.InputText}> <b>Nombre: </b>{JSON.stringify(formValues.Name).slice(1, JSON.stringify(formValues.Name).length - 1)} </p>
                            <p className={styles.InputText}> <b>Cédula Jurídica: </b>{JSON.stringify(formValues.LegalId).slice(1, JSON.stringify(formValues.LegalId).length - 1)} </p>
                            <p className={styles.InputText}> <b>Razón Social: </b>{JSON.stringify(formValues.BusinessName).slice(1, JSON.stringify(formValues.BusinessName).length - 1)} </p>
                        
                        </div>
                    </div>
                    <div>
                        <p className={styles.Formsubtitle} id={styles.SectionOne}> Contacto de Empresa</p>
                        <div className={styles.ModalSubEntry}>
                            <p className={styles.InputText}> <b>Dirección Física: </b> {JSON.stringify(formValues.PhysicalAddress).slice(1, JSON.stringify(formValues.PhysicalAddress).length - 1)} </p>
                            <p className={styles.InputText}> <b>Correo Electrónico: </b> {JSON.stringify(formValues.Email).slice(1, JSON.stringify(formValues.Email).length - 1)}</p>
                        </div>
                        <div className={styles.ModalSubEntry}>
                            <p className={styles.InputText}> <b>Teléfono: </b> {JSON.stringify(formValues.Phone).slice(1, JSON.stringify(formValues.Phone).length - 1)}</p>
                            <p className={styles.InputText}> <b>Página Web: </b> {formValues.Website ? JSON.stringify(formValues.Website).slice(1, JSON.stringify(formValues.Website).length - 1): "" }</p>
                        </div>
                    </div>

                    <div className={styles.ModalButtonPosition}>
                        <Button BaseClass={"btn__medium"} SecundaryClass={"btn__primaryColor"} type="submit" handleClick={handleSubmit} ButtonText="Confirmar"/>
                    </div>
                </div>
                
                
            </Modal>
        </div>
    );
};

export default RegisterCompanyForm;
