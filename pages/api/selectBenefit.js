import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        selectBenefit(req, res);
    };
}

async function selectBenefit (req, res) {
    try {
        const benefits = await prisma.selecciona.create({
            data: {
                cedulaEmpleado: req.body.employeeID,
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
                nombreBeneficio: req.body.benefitName,
                habilitado: true,
            }
        });
        res.status(200).json({ success: benefits });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
