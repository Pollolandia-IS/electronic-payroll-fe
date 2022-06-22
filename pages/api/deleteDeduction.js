import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        deleteDeduction(req, res);
    }
}

async function deleteDeduction (req, res) {
    try {
        const { companyID, projectName, deductionName } = req.body;
        const newName = 'Borrado: ' + deductionName;
        const updateDeduction = await prisma.deduccionVoluntaria.update({
            where: {
                cedulaJuridica_nombreProyecto_nombreDeduccion: {
                    cedulaJuridica: companyID,
                    nombreProyecto: projectName,
                    nombreDeduccion: deductionName,
                }
            }, data: {
                nombreDeduccion: newName,
                habilitado: false,
            },
        });
        res.status(200).json(updateDeduction);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
