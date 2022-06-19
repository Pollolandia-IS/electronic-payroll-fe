import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        getAcquiredDeductions(req, res);
    };
}

async function getAcquiredDeductions (req, res) {
    try {
        const result = await prisma.escoge.findMany({
            where: {
                cedulaEmpleado: req.body.employeeID,
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
            }, select: {
                nombreDeduccion: true,
                aporte: true,
            },
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
