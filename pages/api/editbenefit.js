import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method == "POST") {
        editBenefit(req, res);
    }
}

async function editBenefit(req, res) {
    try {
        let {
            companyID,
            oldBenefitName,
            benefitName,
            projectName,
            amount,
            description,
        } = req.body;
        const result =
            await prisma.$executeRaw`EXEC [dbo].[editarbeneficio]${companyID}, ${oldBenefitName}, ${benefitName}, ${projectName}, ${parseInt(
                amount
            )}, ${description}`;

        res.status(200).json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
