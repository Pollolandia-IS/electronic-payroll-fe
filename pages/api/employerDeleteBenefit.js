import { prisma } from "/.db";
const { sendAlertDeletedBenefit } = require("/pages/api/services/mailServices");

export default function handler(req, res) {
    if (req.method === "POST") {
        deleteBenefitFromProject(req, res);
    }
}

async function deleteBenefitFromProject(req, res) {
    try {
        const { companyID, projectName, benefitName } = req.body;
        const newName = "Borrado: " + benefitName;

        const employeesEmail = await getEmails(
            res,
            companyID,
            projectName,
            benefitName
        );

        const updateBenefit = await prisma.beneficios.update({
            where: {
                cedulaJuridica_nombreProyecto_nombreBeneficio: {
                    cedulaJuridica: companyID,
                    nombreProyecto: projectName,
                    nombreBeneficio: benefitName,
                },
            },
            data: {
                nombreBeneficio: newName,
                habilitado: false,
            },
        });

        for (let i = 0; i < employeesEmail.length; i++) {
            sendAlertDeletedBenefit(
                employeesEmail[i].email,
                benefitName,
                projectName
            );
        }

        res.status(200).json(updateBenefit);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

async function getEmails(res, companyID, projectName, benefitName) {
    try {
        const employeesEmail = await prisma.$queryRaw`
        SELECT email FROM hace_uso INNER JOIN selecciona ON selecciona.cedulaEmpleado = hace_uso.cedula
        AND selecciona.nombreProyecto = ${projectName}
        AND selecciona.nombreBeneficio = ${benefitName} 
        AND selecciona.cedulaJuridica = ${companyID};`;

        return employeesEmail;
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
