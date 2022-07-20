import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        getHoursEmployer(req, res);
    }
}

async function getHoursEmployer(req, res) {
    try {
        const {employerId, companyId} = req.body;
        const hours = await prisma.reporteHoras.findMany({
            where: {
                cedulaEmpleador: employerId,
                cedulaJuridica: companyId,
            },
            select: {
                nombreProyecto: true,
                horasTrabajadas: true,
                fechaHora: true,
                estado: true,
                cedulaEmpleado: true,
            },
            orderBy: {
                cedulaEmpleado: "asc",
                fechaHora: "asc",
            },
        });
        res.status(200).json(hours);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
