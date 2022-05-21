import Button from '../ButtonMedium'
import Styles from '../../styles/RegisterCompanyForm.module.css';

function RegisterCompanyInput(props){
    const required = props.required

    return(
        
        <div className={Styles.InputElement}>
            <label className={Styles.InputLabel} forhtml={props.name}>  {props.tag} </label>
            {
            props.required ?
                <input className={Styles.InputTextBox} type={props.type} id={props.name} required /> :
                <input className={Styles.InputTextBox} type={props.type} id={props.name} />
            }
        </div>
    );
}

function RegisterCompanyForm (){
    return(
        <>
            <div className={Styles.navBar}>
			<p> Inicio </p>
            </div>

            <div className={Styles.sideBar}>
                <p> Registro </p>
            </div>

            <div className={Styles.formLayer}>
            <p className={Styles.subtitle}> Ingresa los datos de tu Empresa </p>
                <form>
                    <p className={Styles.Formsubtitle}> Datos de Empresa</p>

                    <div className={Styles.SubEntry}>
                        <RegisterCompanyInput name="Name" type="text" tag="Nombre: *" required={true} />
                        <RegisterCompanyInput name="BusinessName" type="text" tag="Razón Social: *" required={true} />
                    </div>

                    <div className={Styles.SubEntry}>
                        <RegisterCompanyInput name="LegalId" type="text" tag="Cédula Jurídica: *" required={true} />
                    </div>

                    <p className={Styles.Formsubtitle}> Contacto de Empresa </p>

                    <div className={Styles.SubEntry}>
                        <RegisterCompanyInput name="PhysicalAddress" type="text" tag="Dirección Física: *" required={true} />
                        <RegisterCompanyInput name="Email" type="text" tag="Correo Electrónico: *" required={true} />
                    </div>

                    <div className={Styles.SubEntry}>
                        <RegisterCompanyInput name="Phone" type="text" tag="Teléfono: *" required={true} />
                        <RegisterCompanyInput name="Website" type="text" tag="Página Web:" required={false} />
                    </div>
                    <div className={Styles.ButtonPosition}>
                        <Button ButtonText="Enviar "> </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterCompanyForm;