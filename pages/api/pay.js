import { addDays } from "../../logic/DateTimeHelpers";
import { getNextPaymentDate } from "../../logic/Payroll";
import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        payProject(req, res);
    }
}

const payProject = async (req, res) => {
    const { contracts, payments, frequency, endDate } = req.body;
    const payDate = new Date().toISOString();
    const newStartDate = addDays(new Date(endDate), 1);
    const newEndDate = getNextPaymentDate(newStartDate, frequency);

    try {
        const pays = JSON.parse(contracts).map((contract, index) => {
            return {
                cedulaEmpleado: contract.cedulaEmpleado,
                fechaHora: payDate,
                deduccionesEmpleado: JSON.stringify(
                    payments[index].mandatoryDeductions
                ),
                deduccionesPatrono: JSON.stringify(
                    payments[index].employerMandatoryDeductions
                ),
                salarioBruto: payments[index].salary,
                beneficios: JSON.stringify(payments[index].benefits),
                salarioNeto: payments[index].netSalary,
                deduccionesVoluntarias: JSON.stringify(
                    payments[index].voluntaryDeductions
                ),
            };
        });
        const generates = JSON.parse(contracts).map((contract, index) => {
            return {
                cedulaEmpleado: contract.cedulaEmpleado,
                fechaHora: payDate,
                cedulaJuridica: contract.cedulaJuridica,
                nombreProyecto: contract.nombreProyecto,
            };
        });
        await prisma.pago.createMany({
            data: pays,
        });
        await prisma.genera.createMany({
            data: generates,
        });
        await prisma.proyecto.update({
            where: {
                cedulaJuridica_nombre: {
                    cedulaJuridica: JSON.parse(contracts)[0].cedulaJuridica,
                    nombre: JSON.parse(contracts)[0].nombreProyecto,
                },
            },
            data: {
                fechaInicio: newStartDate.toISOString(),
                fechaFin: newEndDate.toISOString(),
            },
        });
        res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "error",
        });
    }
};
