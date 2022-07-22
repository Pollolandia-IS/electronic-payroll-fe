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

export default function handler(req, res) {
    if (req.method == "POST") {
        sendPDF(req, res);
    }
}

async function sendPDF(req, res) {
    let body = req.body.substring(req.body.indexOf("\n") + 1);
    body = body.substring(body.indexOf("\n") + 1);
    body = body.substring(body.indexOf("\n") + 1);
    body = body.substring(body.indexOf("\n") + 1);
    body = body.substring(0, body.lastIndexOf("\n"));
    body = body.substring(0, body.lastIndexOf("\n"));
    // send pdf to email as attachment
    const transporter = getTransporter();
    await transporter.sendMail({
        from: "Desglose de pago <pollolandiaSolutions@gmail.com>",
        to: req.headers["user-mail"],
        subject: "Desglose de pago",
        text: `Desglose de pago`,
        html: `
        <div style="text-align:center;">
        <img src="cid:logo1"/>
            <div> <h1 styles="font-size: 40px;">Estimado ${req.headers["user-name"]}, adjunto el desglose de su pago.</h1>
        </div>
        `,
        attachments: [
            {
                filename: "Desglose-de-pago.pdf",
                content: body,
                contentType: "application/pdf",
                cid: "Desglose-de-pago",
            },
            {
              filename: "Logo.png",
              path: "https://res.cloudinary.com/dwb71vld4/image/upload/v1655428531/Logo_cfddx3.png",
              cid: "logo1",
          },
        ],
    });
    res.status(200).json({
        message: "Email sent",
    });
}
