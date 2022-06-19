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

exports.sendPasswordToEmployee = async (userEmail, password) => {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Nueva contraseña generada <pollolandiaSolutions@gmail.com>",
        to: userEmail,
        subject: "Su código de acceso a la aplicacion Pollolandia Solutions",
        text: `Su código de acceso a la aplicacion Pollolandia Solutions es: ${password}`,
        html: `
          <div style="text-align:center;">
              <img src="cid:logo1"/>
              <div> <h1 styles="font-size: 40px;"> Bienvenido a la plataforma Pollolandia Solutions</h1> </div>
              <h1>Su código de acceso a la aplicacion es:</h1>
              <div style="text-align:center; justify-content: center; margin-top: 20px;"> 
                  <h1 id="ContendUserCode" style="margin-bottom: 40px; margin-top: 40px; font-size: 80px; font-weight: 700;">${password}</h1>
              </div>
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
