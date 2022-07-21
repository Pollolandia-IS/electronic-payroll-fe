import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        getHoursEmployer(req, res);
    }
}

async function getHoursEmployer(req, res) {
    try {
        const { employerId, companyId } = req.body;
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
            },
        });

        let counter = 0;
        const hoursReportsWithId = hours.map((hourTime) => ({
            id: counter++,
            horasTrabajadas: hourTime.horasTrabajadas,
            fechaHora: JSON.stringify(hourTime.fechaHora)
                .split("T")[0]
                .substring(1),
            nombreProyecto: hourTime.nombreProyecto,
            estado: hourTime.estado,
            cedulaEmpleado: hourTime.cedulaEmpleado,
        }));

        let employeesId = [];
        for (let i = 0; i < hours.length; i++) {
            if (!employeesId.includes(hours[i].cedulaEmpleado)) {
                employeesId.push(hours[i].cedulaEmpleado);
            }
        }

        let employeesReports = [];
        for (let i = 0; i < employeesId.length; i++) {
            const employee = await prisma.persona.findUnique({
                where: {
                    cedula: employeesId[i],
                },
                select: {
                    nombre: true,
                    cedula: true,
                },
            });
            employeesReports.push(`${employee.nombre},${employee.cedula}`);
        }

        JSON.stringify(hours);

        const result = {
            hoursReportsWithId: hoursReportsWithId,
            hours: hours,
            employeesReports: employeesReports,
            employeesId: employeesId,
        };
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
