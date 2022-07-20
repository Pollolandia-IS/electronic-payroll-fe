import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        editCompany(req, res);
    }
}

async function editCompany(req, res){

    try{
        const { companyName, companyId, companyPhone, companyEmail, companyAddress } = req.body;

        const updateCompany = await prisma.empresa.update({
            where: {
                cedulaJuridica: companyId,
            },
            data:{
                razonSocial : companyName,
                telefono: companyPhone,
                email: companyEmail,
                direccion: companyAddress,
            }
        });

        res.status(200).json(updateCompany);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}