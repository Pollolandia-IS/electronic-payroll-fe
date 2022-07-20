import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        insertCompanytoDataBase(req, res);
    }
}

async function insertCompanytoDataBase(req, res){
    try{
        const {name, email, phone, id, location, employerId} = req.body;
        const createCompany = await prisma.empresa.create({
            data:{
                cedulaJuridica : id,
                razonSocial : name,
                direccion : location,
                telefono : phone,
                email : email,
                cedulaEmpleador : employerId,
            }
        });

        res.status(200).json({createCompany})
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}
