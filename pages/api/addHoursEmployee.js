import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "GET") {
        getHoursEmployee(req, res);
    } else if (req.method === "POST") {
        addHoursEmployee(req, res);
    }
}

async function addHoursEmployee(req, res) {
    const { employeeID, projectID, hours, date } = req.body;
    const cedulaJuridica = (
        await prisma.empleado.findUnique({
            where: {
                cedula: employeeID,
            },
            select: {
                cedulaJuridica: true,
            },
        })
    ).cedulaJuridica;

    const cedulaEmpleador = (
        await prisma.empresa.findUnique({
            where: {
                cedulaJuridica,
            },
            select: {
                cedulaEmpleador: true,
            },
        })
    ).cedulaEmpleador;
    await prisma.reporteHoras.create({
        data: {
            cedulaEmpleado: employeeID,
            cedulaEmpleador: cedulaEmpleador,
            cedulaJuridica: cedulaJuridica,
            nombreProyecto: projectID,
            fechaHora: date.slice(0, 19) + "Z",
            horasTrabajadas: parseInt(hours),
            estado: 1,
        },
    });
    return res.status(200).json({ message: "success" });
}

async function getHoursEmployee(req, res) {
    const { employeeID, projectID } = req.query;
    const hours = await prisma.reporteHoras.findMany({
        where: {
            cedulaEmpleado: employeeID,
            nombreProyecto: projectID,
        },
    });
    return res.status(200).json({ hours });
}
