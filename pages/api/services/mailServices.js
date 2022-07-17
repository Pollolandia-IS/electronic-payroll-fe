const nodemailer = require("nodemailer");
const getTransporter = function () {
    let transporter;
    transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    return transporter;
};

exports.sendPasswordToEmployee = async (
    userEmail,
    password,
    cedulaEmpleado,
    nombreEmpresa
) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Nueva contraseña generada <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Su código de acceso a la aplicacion Pollolandia Solutions",
        text: `Su código de acceso a la aplicacion Pollolandia Solutions es: ${password}`,
        html: `
            <div style="text-align:center;">
                <img src="cid:logo1"/>
                <div> <h1 styles="font-size: 40px;"> Bienvenido a la plataforma Pollolandia Solutions, ha sido agregado a la empresa ${nombreEmpresa} por su empleador </h1> </div>
                    <h1>Su código de acceso a la aplicacion es:</h1>
                <div style="text-align:center; justify-content: center; margin-top: 20px;"> 
                    <h1 style="margin-bottom: 40px; margin-top: 40px; font-size: 80px; font-weight: 700;">${password}</h1>
                </div>
                <div> <h1 styles="font-size: 40px;">Para verificar tu cuenta accede al siguiente enlace: <a href="http://localhost:3000/${cedulaEmpleado}/verify">Click aquí</a> </h1> </div>
                <div> <h1 styles="font-size: 40px;">Advertencia: Si usted no ha sido informado o no está al tanto de este correo, por favor ignórelo. </h1> </div>
            </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
                cid: "logo1",
            },
        ],
    });
};

exports.sendAccountToEmployeer = async (userEmail, cedulaEmpleador, nombre) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Bienvenido a la plataforma <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Bienvenido a la plataforma Pollolandia Solutions",
        text: `Bienvenido a la plataforma Pollolandia Solutions`,
        html: `
        <div style="text-align:center;">
        <img src="cid:logo1"/>
            <div> <h1 styles="font-size: 40px;">Estimado ${nombre}, bienvenido a la plataforma Pollolandia Solutions.</h1>
            <h1 styles="font-size: 40px;">Para verificar tu cuenta accede al siguiente enlace: <a href="http://localhost:3000/${cedulaEmpleador}/verify">Click aquí</a> </h1> </div>
            <div> <h1 styles="font-size: 40px;">Advertencia: Si usted no ha sido informado o no está al tanto de este correo, por favor ignórelo. </h1> </div>
        </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
                cid: "logo1",
            },
        ],
    });
};

exports.sendAlertDeletedProject = async (
    userEmail,
    nombreDeduccion,
    nombreProyecto
) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Notificación de la plataforma Pollolandia Solutions <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Notificación de la plataforma Pollolandia Solutions",
        text: `Notificación de la plataforma Pollolandia Solutions`,
        html: `
        <div style="text-align:center;">
            <img src="cid:logo1"/>
            <div> <h1 styles="font-size: 40px;"> Notificación de la plataforma Pollolandia Solutions:</h1> </div>
            <h1>Estimado trabajador, la deducción ${nombreDeduccion} ha sido removido del proyecto ${nombreProyecto} al cual usted pertenece, por favor revisar en su perfil y tomar las previsiones del caso.</h1>
        </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
                cid: "logo1",
            },
        ],
    });
};

exports.sendAlertDeletedBenefit = async (
    userEmail,
    nombreBeneficio,
    nombreProyecto
) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Notificación de la plataforma Pollolandia Solutions <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Notificación de la plataforma Pollolandia Solutions",
        text: `Notificación de la plataforma Pollolandia Solutions`,
        html: `
        <div style="text-align:center;">
            <img src="cid:logo1"/>
            <div> <h1 styles="font-size: 40px;"> Notificación de la plataforma Pollolandia Solutions:</h1> </div>
            <h1>Estimado trabajador, el beneficio ${nombreBeneficio} asociado al proyecto ${nombreProyecto} ha sido removido de la plataforma, por favor revisar en su perfil y tomar las previsiones del caso.</h1>
        </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
                cid: "logo1",
            },
        ],
    });
};

exports.sendAlertDeletedDeduccion = async (
    userEmail,
    nombreDeduccion,
    nombreProyecto
) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Notificación de la plataforma Pollolandia Solutions <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Notificación de la plataforma Pollolandia Solutions",
        text: `Notificación de la plataforma Pollolandia Solutions`,
        html: `
        <div style="text-align:center;">
            <img src="cid:logo1"/>
            <div> <h1 styles="font-size: 40px;"> Notificación de la plataforma Pollolandia Solutions:</h1> </div>
            <h1>Estimado trabajador, la deducción voluntaria ${nombreDeduccion} asociado al proyecto ${nombreProyecto} ha sido removida de la plataforma. Por favor revisar en su perfil y tomar las previsiones del caso.</h1>
        </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
                cid: "logo1",
            },
        ],
    });
};

exports.sendAlertEditProject = async (userEmail, nombreProyecto) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Notificación de la plataforma Pollolandia Solutions <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Notificación de la plataforma Pollolandia Solutions",
        text: `Notificación de la plataforma Pollolandia Solutions`,
        html: `
        <div style="text-align:center;">
            <img src="cid:logo1"/>
            <div> <h1 styles="font-size: 40px;"> Notificación de la plataforma Pollolandia Solutions:</h1> </div>
            <h1>Estimado trabajador, el proyecto ${nombreProyecto} ha sido modificado en la plataforma. Por favor revisar en su perfil y tomar las previsiones del caso.</h1>
        </div>`,
        attachments: [
            {
                filename: "Logo.png",
                path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
                cid: "logo1",
            },
        ],
    });
};
