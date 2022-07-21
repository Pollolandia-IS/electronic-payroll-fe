import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        addHoursEmployer(req, res);
    }
}

async function addHoursEmployer(req, res) {
    try {
        const {cedulaEmpleado, fechaHora, estado} = req.body;
        const result = await prisma.reporteHoras.update({
            where: {
                cedulaEmpleado_fechaHora: {
                    cedulaEmpleado: cedulaEmpleado,
                    fechaHora: fechaHora,
                },
            },
            data: {
                estado: estado,
            },
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
