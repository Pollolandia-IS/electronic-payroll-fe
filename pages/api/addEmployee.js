import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method === "POST") {
        addEmployeeToProject(req, res);
    }
}

async function addEmployeeToProject(req, res) {
  try {
      const { cedulaJuridica, nombreProyecto, cedulaEmpleado, tipoEmpleado, puesto, fechaInicio, fechaFin, jornada, salario } = req.body;
      await prisma.esContratado.create({
        data: {
          cedulaJuridica: cedulaJuridica,
          nombreProyecto: nombreProyecto,
          cedulaEmpleado: cedulaEmpleado,
          tipoEmpleado: tipoEmpleado,
          puesto: puesto,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          jornada: jornada,
          salario: salario
        },
      });
      return res.status(200).json({ success: "OK" });
    
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
}
