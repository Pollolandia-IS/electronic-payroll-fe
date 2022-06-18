import { prisma } from "/.db";
const { sendAccoutToEmployee } = require("/pages/api/services/mailServices");
const { generatePassword } = require("/pages/api/services/generatePassword");
const { generateHash } = require("/pages/api/services/hashCodes");

export default function handler(req, res) {
    if(req.method === 'POST') {
        addEmployeeToProject(req, res)
    }
}

async function addEmployeeToProject(req, res) {
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
        cedulaJuridica: req.body.cedulaJuridica
      },
    });
    const password = generatePassword();
    await sendAccoutToEmployee("empleadopollolandia@gmail.com", password);
    return res.status(200).json({ success: "OK" });
  }
 } catch (e) {
    return res.status(500).json({ e });
 }
    

}
