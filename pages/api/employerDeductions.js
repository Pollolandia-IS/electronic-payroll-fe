import { prisma } from "/.db";

export default function handler(req, res) {
    if(req.method === 'POST') {
        addDeductionToProject(req, res)
    }
}

async function addDeductionToProject(req, res) {
    /*try{*/
        console.log("No me caí");
        const { companyID, deductionName, projectName, amount, description} = req.body;
        const createDeduction = await prisma.deduccionVoluntaria.create({
            data:{
                cedulaJuridica: companyID,
                nombreProyecto : projectName,
                nombreDeduccion : deductionName,
                monto:  parseInt(amount),
                descripcion : description,
            }
        });
        console.log("Salí :D");
        res.status(200).json(createDeduction);
    /*} catch(error){
        res.status(500);
        res.send(error.message);
    }*/
}
