import Button from './Button'
import styles from '../styles/RegisterCompanyForm.module.css';

const RegisterCompanyInput = (props) => {
    return(
        <div className={styles.InputElement}>
            <label className={styles.InputLabel} forhtml={props.name}>  {props.tag} </label>
            <input className={styles.InputTextBox} type={props.type} id={props.name} required={props.required} />
        </div>
    );
}

function openRegisterCompanyModal(){
    
}

function RegisterCompanyForm (){
    return(
        <div className={styles.formLayer}>
            <p className={styles.subtitle}> Ingresa los datos de tu Empresa </p>
            
            <form>
                <p className={styles.Formsubtitle}> Datos de Empresa</p>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="Name" type="text" tag="Nombre: *" required={true} />
                    <RegisterCompanyInput name="BusinessName" type="text" tag="Razón Social: *" required={true} />
                </div>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="LegalId" type="text" tag="Cédula Jurídica: *" required={true} />
                </div>

                <p className={styles.Formsubtitle}> Contacto de Empresa </p>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="PhysicalAddress" type="text" tag="Dirección Física: *" required={true} />
                    <RegisterCompanyInput name="Email" type="text" tag="Correo Electrónico: *" required={true} />
                </div>

                <div className={styles.SubEntry}>
                    <RegisterCompanyInput name="Phone" type="text" tag="Teléfono: *" required={true} />
                    <RegisterCompanyInput name="Website" type="text" tag="Página Web:" required={false} />
                </div>

                <div className={styles.CancelButtonPosition}>
                    <Button styleClass="btn__cancel" type="button" OnClick={'/'} ButtonText="Cancelar"/>
                </div>

                <div className={styles.AcceptButtonPosition}>
                    <Button styleClass="btn__medium" type="button" Onclick={openRegisterCompanyModal} ButtonText="Enviar"/>
                </div>
            </form>
        </div>
    );
};

export default RegisterCompanyForm;