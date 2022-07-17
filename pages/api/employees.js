import { prisma } from "/.db";
const { sendPasswordToEmployee } = require("/pages/api/services/mailServices");
const { generatePassword } = require("/pages/api/services/generatePassword");

export default function handler(req, res) {
    if (req.method == "POST") {
        insertEmployeeToDatabase(req, res);
    }
}

async function insertEmployeeToDatabase(req, res) {
    let userPassword = generatePassword();
    try {
        const { Nombre, Cedula, Email, Telefono, CedJuridica } = req.body;
        const person = await prisma.persona.create({
            data: {
                cedula: Cedula,
                nombre: Nombre,
                telefono: parseInt(Telefono),
            },
        });

        const employee = await prisma.empleado.create({
            data: {
                cedula: Cedula,
                cedulaJuridica: CedJuridica,
            },
        });
        const credentials = await prisma.credenciales.create({
            data: {
                email: Email,
                contrasenna: userPassword,
                verificado: false,
            },
        });
        const uses = await prisma.hace_uso.create({
            data: {
                cedula: Cedula,
                email: Email,
            },
        });

        const nombreEmpresa = await prisma.empresa.findUnique({
            where: {
                cedulaJuridica: CedJuridica,
            },
            select: {
                razonSocial: true,
            },
        });
        await sendPasswordToEmployee(
            Email,
            userPassword,
            Cedula,
            nombreEmpresa.razonSocial
        );
        let result = [person, employee, credentials, uses];
        res.status(200).json({ result });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
