import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        insertCompanytoDataBase(req, res);
    }
}

async function insertCompanytoDataBase(req, res){
    try{
        const{employerId, Values} = req.body;
        const {legalid, businessname, physicaladdress,phone,companyemail,website} = Values;
        
        const createCompany = await prisma.empresa.create({
            data:{
                cedulaJuridica : parseInt(legalid),
                razonSocial : businessname,
                direccion : physicaladdress,
                telefono : parseInt(phone),
                email : companyemail,
                paginaWeb : website,
            }
        });

        const createCompanyEmployer = await prisma.empresa.create({
            data:{
                cedulaJuridica : parseInt(legalid),
                cedula : parseInt(employerId),
                razonSocial : businessname,
                direccion : physicaladdress,
                telefono : parseInt(phone),
                email : companyemail,
                paginaWeb : website,
            }
        });

        res.status(200).json({createCompany, createCompanyEmployer })
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}
