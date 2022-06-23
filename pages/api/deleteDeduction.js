import { prisma } from "/.db";
const { sendAlertDeletedProject } = require("/pages/api/services/mailServices");

export default function handler(req, res) {
    if (req.method == "POST") {
        deleteDeduction(req, res);
    }
}

async function deleteDeduction(req, res) {
    try {
        const { companyID, projectName, deductionName } = req.body;
        const newName = "Borrado: " + deductionName;

        const employeesEmail = await getEmails(
            res,
            companyID,
            projectName,
            deductionName
        );

        const updateDeduction = await prisma.deduccionVoluntaria.update({
            where: {
                cedulaJuridica_nombreProyecto_nombreDeduccion: {
                    cedulaJuridica: companyID,
                    nombreProyecto: projectName,
                    nombreDeduccion: deductionName,
                },
            },
            data: {
                nombreDeduccion: newName,
                habilitado: false,
            },
        });

        for (let i = 0; i < employeesEmail.length; i++) {
            await sendAlertDeletedProject(
                employeesEmail[i].email,
                deductionName,
                projectName
            );
        }

        res.status(200).json(updateDeduction);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

async function getEmails(res, companyID, projectName, deductionName) {
    try {
        const employeesEmail = await prisma.$queryRaw`
        SELECT email FROM hace_uso INNER JOIN escoge ON escoge.cedulaEmpleado = hace_uso.cedula
        AND escoge.nombreProyecto = ${projectName}
        AND escoge.nombreDeduccion = ${deductionName} 
        AND escoge.cedulaJuridica = ${companyID};`;

        return employeesEmail;
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
