import { prisma } from "/.db";

export default function handler(req, res) {
    if(req.method === 'POST') {
        editDeduction(req, res)
    }
}

async function editDeduction(req, res) {
    try{
        console.log(req.body);
        const { companyID, oldProjectName, oldDeductionName, projectName, deductionName, amount, description} = req.body;
        const createDeduction =
        await prisma.$executeRaw`EXEC [dbo].[editarDeduccionVoluntaria]${companyID}, ${oldProjectName}, ${oldDeductionName}, ${projectName}, ${deductionName}, ${parseInt(
            amount
        )}, ${description}`;
        res.status(200).json(createDeduction);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}
