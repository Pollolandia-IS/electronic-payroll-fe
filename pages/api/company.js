import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        insertCompanytoDataBase(req, res);
    }
}

async function insertCompanytoDataBase(req, res){
    try{
        const {legalid, businessname, physicaladdress,phone,companyemail,website} = req.body;
        const result = await prisma.empresa.create({
            data:{
                cedulaJuridica : parseInt(legalid),
                razonSocial : businessname,
                direccion : physicaladdress,
                telefono : parseInt(phone),
                email : companyemail,
                paginaWeb : website,
            }
        });
        res.status(200).json(result)
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}
