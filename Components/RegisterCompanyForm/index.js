import Button from '../ButtonMedium'
import Styles from '../../styles/RegisterCompanyForm.module.css';

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
                        <div className={Styles.InputElement}>
                            <label className={Styles.InputLabel} forhtml="name">  Nombre: </label>
                            <input className={Styles.InputTextBox} type="text" id="name" />
                        </div>

                        <div className={Styles.InputElement}>
                            <label className={Styles.InputLabel} forhtml="BusinessName"> Razón Social: </label>
                            <input className={Styles.InputTextBox} type="text" id="BusinessName"  />
                        </div>
                    </div>

                    <div className={Styles.SubEntry}>
                        <div className={Styles.InputElement}>
                            <label className={Styles.InputLabel} forhtml="LegalId"> Cédula Jurídica: </label>
                            <input className={Styles.InputTextBox} type="text" id="LegalId"/>
                        </div>
                    </div>

                    <p className={Styles.Formsubtitle}> Contacto de Empresa </p>
                    <div className={Styles.SubEntry}>
                        <div className={Styles.InputElement}>
                            <label className={Styles.InputLabel} forhtml="PhysicalAddress"> Dirección Física: </label>
                            <input className={Styles.InputTextBox} type="text" id="PhysicalAddress" />
                        </div>

                        <div className={Styles.InputElement}>
                            <label className={Styles.InputLabel} htmfor="Email"> Correo Electrónico: </label>
                            <input className={Styles.InputTextBox} type="text" id="Email" />
                        </div>
                    </div>

                    <div className={Styles.SubEntry}>
                        <div className={Styles.InputElement} >
                            <label className={Styles.InputLabel} forhtml="Phone"> Teléfono: </label>
                            <input className={Styles.InputTextBox} type="text" id="Phone" />
                        </div>

                        <div className={Styles.InputElement}>
                            <label className={Styles.InputLabel} forhtml="Website"> Página Web: </label>
                            <input className={Styles.InputTextBox} type="text" id="Website" />
                        </div>
                    </div>
                    
                    <Button ButtonText="Enviar "> </Button>
                    
                </form>
            </div>
        </>
    );
};

export default RegisterCompanyForm;