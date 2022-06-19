import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        getDeductions(req, res);
    };
}

async function getDeductions (req, res) {
    try {
        const result = await prisma.deduccionVoluntaria.findMany({
            where: {
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
