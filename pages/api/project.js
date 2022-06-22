import { ErrorSharp } from '@mui/icons-material';
import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        if(req.headers.editproject == 'true'){
            editProject(req, res);
        } else{
            insertProject(req, res);
        }
    };
}

async function insertProject (req, res) {
     try {
        let {companyID, name, frequency, currency, amount, benefits, date} = req.body;
        const result = await prisma.proyecto.create({
            data: {
                cedulaJuridica: companyID,
                nombre: name,
                moneda: currency,
                cantidadMaximaBeneficios: parseInt(benefits),
                montoMaximoBeneficio: parseInt(amount),
                frecuenciaPago: frequency,
                fechaInicio: date,
                habilitado: true,
            }
        });
        res.status(200).json(result);
         res.status(200);
     } catch (error) {
         res.status(500);
         res.send(error.message);
     }
};

async function editProject (req, res) {
    try {
        let {companyID, oldname, name, benefits, amount, frequency, currency,  date} = req.body;
        const result = await prisma.$executeRaw`EXEC [dbo].[editarproyecto]${companyID}, ${oldname}, ${name}, ${benefits}, ${amount}, ${frequency}, ${currency}, ${date}`;

       res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
