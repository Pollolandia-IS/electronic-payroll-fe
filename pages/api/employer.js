import { ErrorSharp } from '@mui/icons-material';
import {prisma} from '/.db';

export default function handler (req, res) {
    console.log("API");
    if (req.method == "POST") {
        insertEmployer(req, res);
    };
}

async function insertEmployer (req, res) {
    try {
        const {id, email, phoneNumber, name, password} = req.body;
        const credentials = await prisma.credenciales.create({
            data: {
                email: email,
                contrasenna: password,
            }
        });
        const person = await prisma.persona.create({
            data: {
                cedula: id,
                nombre: name,
                telefono: parseInt(phoneNumber),
                foto: null,
            }
        });
        const uses = await prisma.hace_uso.create({
            data: {
                cedula: id,
                email: email,
            }
        });
        const employer = await prisma.empleador.create({
            data: {
                cedula: id,
            }
        });
        result = [credentials, person, uses, employer];
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
