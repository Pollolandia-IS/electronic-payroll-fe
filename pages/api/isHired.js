import {prisma} from '/.db';
import safeJsonStringify from 'safe-json-stringify';

export default function handler (req, res) {
    if (req.method == "POST") {
        isHired(req, res);
    };
}

async function isHired (req, res) {
    try {
        const isHired = await prisma.esContratado.findMany({
            where: {
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
                cedulaEmpleado: req.body.employeeID,
            }
        });
        JSON.parse(safeJsonStringify(isHired));
        res.status(200).json(isHired);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
