import { ErrorSharp } from "@mui/icons-material";
import { prisma } from "/.db";
const { sendAlertEditProject } = require("/pages/api/services/mailServices");

export default function handler(req, res) {
    if (req.method == "POST") {
        if (req.headers.editproject == "true") {
            editProject(req, res);
        } else {
            insertProject(req, res);
        }
    }
}

async function insertProject(req, res) {
    try {
        let { companyID, name, frequency, currency, amount, benefits, date } =
            req.body;
        const result = await prisma.proyecto.create({
            data: {
                cedulaJuridica: companyID,
                nombre: name,
                moneda: currency,
                cantidadMaximaBeneficios: parseInt(benefits),
                montoMaximoBeneficio: parseInt(amount),
                frecuenciaPago: frequency,
                fechaInicio: date,
                habilitado: true,
            },
        });
        res.status(200).json(result);
        res.status(200);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

async function editProject(req, res) {
    try {
        let {
            companyID,
            oldname,
            name,
            benefits,
            amount,
            frequency,
            currency,
            date,
            benefitDataChanged,
        } = req.body;

        const emails = await getEmails(res, companyID, oldname);

        const result =
            await prisma.$executeRaw`EXEC [dbo].[editarproyecto]${companyID}, ${oldname}, ${name}, ${benefits}, ${amount}, ${frequency}, ${currency}, ${date}`;

        if (benefitDataChanged) {
            for (let i = 0; i < emails.length; i++) {
                await sendAlertEditProject(emails[i].email, oldname);
            }
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

async function getEmails(res, companyID, projectName) {
    try {
        const employeesEmail =
            await prisma.$queryRaw`SELECT email FROM hace_uso INNER JOIN esContratado ON esContratado.cedulaEmpleado = hace_uso.cedula
        AND esContratado.nombreProyecto = ${projectName}
        AND esContratado.cedulaJuridica = ${companyID};`;

        return employeesEmail;
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
