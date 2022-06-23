import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        insertCompanytoDataBase(req, res);
    }
}

async function insertCompanytoDataBase(req, res){
    try{
        const{employerId, Values} = req.body;
        console.log(employerId, Values);
        const {legalid, businessname, physicaladdress,phone,companyemail,website} = Values;
        
        const createCompany = await prisma.empresa.create({
            data:{
                cedulaJuridica : legalid,
                razonSocial : businessname,
                direccion : physicaladdress,
                telefono : parseInt(phone),
                email : companyemail,
                paginaWeb : website,
                cedulaEmpleador : employerId[2],
                habilitado : true,
            }
        });

        res.status(200).json({createCompany})
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}
