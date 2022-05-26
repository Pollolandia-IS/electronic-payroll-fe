import { ErrorSharp } from '@mui/icons-material';
import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        insertProject(req, res);
    };
}

async function insertProject (req, res) {
    try {
        const {companyID, name, currency, amountBenefit, moneyBenefit, frequency} = req.body;
        const result = await prisma.proyecto.create({
            data: {
                cedulaJuridica: parseInt(companyID),
                nombre: name,
                moneda: currency,
                cantidadMaximaBeneficios: parseInt(amountBenefit),
                montoMaximoBeneficio: parseInt(moneyBenefit),
                frecuenciaPago: frequency,
            }
        });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
