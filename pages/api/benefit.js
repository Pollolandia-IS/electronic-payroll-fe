import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        getBenefits(req, res);
    };
}

async function getBenefits (req, res) {
    try {
        const result = await prisma.beneficios.findMany({
            where: {
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
                habilitado: true,
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
