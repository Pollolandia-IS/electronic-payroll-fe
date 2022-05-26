import { prisma } from "/.db";

export default function handler(req, res) {
    if(req.method === 'POST') {
        addEmployeeToProject(req, res)
    }
}

async function addEmployeeToProject(req, res) {
    console.log(req.body);
    if (!req.body || !req.body.form || !req.body.selectedEmployees) {
      return res.status(400).json({ error: "Faltan datos" });
    }

 try {
  for (let employee of req.body.selectedEmployees) {
    await prisma.esContratado.create({
      data: {
        ...req.body.form,
        cedulaEmpleado: employee,
        nombreProyecto: req.body.nombreProyecto,
        cedulaJuridica: parseInt(req.body.cedulaJuridica)
      },
    });
    return res.status(200).json({ success: "OK" });
  }
 } catch (e) {
    return res.status(500).json({ e });
 }
    

}
