import { ErrorSharp } from "@mui/icons-material";
import { prisma } from "/.db";
const { sendAccountToEmployeer } = require("/pages/api/services/mailServices");

export default function handler(req, res) {
    console.log("API");
    if (req.method == "POST") {
        insertEmployer(req, res);
    }
}

async function insertEmployer(req, res) {
    try {
        const { id, email, phoneNumber, name, password } = req.body;
        const credentials = await prisma.credenciales.create({
            data: {
                email: email,
                contrasenna: password,
                verificado: false,
            },
        });
        const person = await prisma.persona.create({
            data: {
                cedula: id,
                nombre: name,
                telefono: parseInt(phoneNumber),
            },
        });
        const uses = await prisma.hace_uso.create({
            data: {
                cedula: id,
                email: email,
            },
        });
        const employer = await prisma.empleador.create({
            data: {
                cedula: id,
            },
        });

        await sendAccountToEmployeer(email, id, name);
        let result = [credentials, person, uses, employer];
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
