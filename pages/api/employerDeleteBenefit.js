import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        deleteBenefitFromProject(req, res);
    }
}

async function deleteBenefitFromProject(req, res) {
    try {
        const { companyID, projectName, benefitName } = req.body;
        const newName = 'Borrado: ' + benefitName;
        const updateBenefit = await prisma.beneficios.update({
            where: {
                cedulaJuridica_nombreProyecto_nombreBeneficio: {
                    cedulaJuridica: companyID,
                    nombreProyecto: projectName,
                    nombreBeneficio: benefitName,
                }
            }, data: {
                nombreBeneficio: newName,
                habilitado: false,
            },
        });
        res.status(200).json(updateBenefit);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
