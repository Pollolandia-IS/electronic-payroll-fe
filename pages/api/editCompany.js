import {prisma} from '/.db'
import jwt from "jsonwebtoken";

export default function handler(req, res){
    if(req.method === "POST"){
        editCompany(req, res);
    }
}

async function editCompany(req, res){

    try{
        const { companyName, companyId, companyPhone, companyEmail, companyAddress, id, isEmployer, name, email } = req.body;

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
        const userData = { isEmployer: isEmployer, name: name, email: email, id: id, companyId: companyId };
        const token = jwt.sign( {userData} , process.env.JWT_SECRET);
        res.status(200).json(token);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}
