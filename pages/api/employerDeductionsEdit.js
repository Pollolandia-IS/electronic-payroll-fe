import { prisma } from "/.db";

export default function handler(req, res) {
    if(req.method === 'POST') {
        editDeduction(req, res)
    }
}

async function editDeduction(req, res) {
    //try{
        const { companyID, deductionName, projectName, amount, description} = req.body;
        const createDeduction = await prisma.deduccionVoluntaria.update({
            where: {
                cedulaJuridica_nombreProyecto_nombreDeduccion : {
                    cedulaJuridica : companyID,
                    nombreProyecto : projectName,
                    nombreDeduccion : deductionName
                }
            },
            data:{
                cedulaJuridica: companyID,
                nombreProyecto : projectName,
                nombreDeduccion : deductionName,
                monto:  parseInt(amount),
                descripcion : description,
            }
        });
        res.status(200).json(createDeduction);
    /*} catch(error){
        res.status(500);
        res.send(error.message);
    }*/
}
