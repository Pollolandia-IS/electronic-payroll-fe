import { ErrorSharp } from '@mui/icons-material';
import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        insertProject(req, res);
    };
}

async function insertProject (req, res) {
    try {
        let {companyID, name, frequency, currency, amount, benefits, date} = req.body;
        const result = await prisma.proyecto.create({
            data: {
                cedulaJuridica: parseInt(companyID),
                nombre: name,
                moneda: currency,
                cantidadMaximaBeneficios: parseInt(benefits),
                montoMaximoBeneficio: parseInt(amount),
                frecuenciaPago: frequency,
                fechaInicio: date,
            }
        });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
