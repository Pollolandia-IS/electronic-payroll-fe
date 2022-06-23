import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        addBenefitToProject(req, res);
    }
}

async function addBenefitToProject(req, res) {
    try {
        const { companyID, benefitName, projectName, amount, description } =
            req.body;
        const createBenefit = await prisma.beneficios.create({
            data: {
                cedulaJuridica: companyID,
                nombreProyecto: projectName,
                nombreBeneficio: benefitName,
                montoPago: parseInt(amount),
                descripcion: description,
                habilitado: true,
            },
        });
        res.status(200).json(createBenefit);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
