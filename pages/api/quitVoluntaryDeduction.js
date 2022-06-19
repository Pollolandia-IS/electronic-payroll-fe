import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method == "POST") {
        deleteVoluntaryDeduction(req, res);
    }
}

async function deleteVoluntaryDeduction(req, res) {
    try {
        const result = await prisma.escoge.delete({
            where: {
                cedulaEmpleado_cedulaJuridica_nombreProyecto_nombreDeduccion: {
                    cedulaEmpleado: req.body.employeeID,
                    cedulaJuridica: req.body.companyID,
                    nombreProyecto: req.body.projectName,
                    nombreDeduccion: req.body.deductionName,
                },
            },
        });
        res.status(200).json({ success: result });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
