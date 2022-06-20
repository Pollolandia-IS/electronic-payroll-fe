import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method == "POST") {
        selectDeduction(req, res);
    }
}

async function selectDeduction(req, res) {
    try {
        const result = await prisma.escoge.create({
            data: {
                cedulaEmpleado: req.body.employeeID,
                cedulaJuridica: req.body.companyID,
                nombreProyecto: req.body.projectName,
                nombreDeduccion: req.body.deductionName,
                aporte: req.body.amount,
            },
        });
        res.status(200).json({ success: result });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
