import Form from '../../components/Form.js';

function CuentaAdmin() {
    //TODO: add NavBar
    return (
        <>
            <Form titles= {[["Cedula", "text"], ["Email", "email"], ["Teléfono", "tel"], ["Nombre", "text"], 
                ["Contraseña", "password"], ["Confirmar Contraseña", "password"]]} button = "CONFIRMAR"/>
        </>
    );
}

export default CuentaAdmin;
