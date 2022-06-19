import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        deleteBenefit(req, res);
    };
}

async function deleteBenefit (req, res) {
    try {
        const benefits = await prisma.selecciona.delete({
            where: {
                cedulaEmpleado_cedulaJuridica_nombreProyecto_nombreBeneficio: {
                    cedulaEmpleado: req.body.employeeID,
                    cedulaJuridica: req.body.companyID,
                    nombreProyecto: req.body.projectName,
                    nombreBeneficio: req.body.benefitName,
                }
            },
        });
        res.status(200).json({ success: benefits });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
