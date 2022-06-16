import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        getAcquiredBenefits(req, res);
    };
}

async function getAcquiredBenefits (req, res) {
    try {
        const selectedBenefits = await prisma.selecciona.findMany({
            where: {
                cedulaEmpleado: req.body.employeeID,
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
            },
        });
        res.status(200).json(selectedBenefits);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
