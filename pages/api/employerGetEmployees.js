import { tr } from "date-fns/locale";
import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        getEmployees(req, res);
    }
}

async function getEmployees(req, res) {
    try {
        const {employeesIds} = req.body;
        let employees = [];
        for (let i = 0; i < employeesIds.length; i++) {
            const employee = await prisma.persona.findUnique({
                where: {
                    cedula: employeesIds[i],
                    empleado: true,
                },
                select: {
                    nombre: true,
                    cedula: true,
                },
            });
            employees.push(`${employee.nombre} ${employee.cedula}`);
        }
        employees.sort();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
