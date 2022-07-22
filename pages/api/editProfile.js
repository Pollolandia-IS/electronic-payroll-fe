import {prisma} from '/.db'
import jwt from "jsonwebtoken";

export default function handler(req, res){
    if(req.method === "POST"){
        editProfile(req, res);
    }
}

async function editProfile(req, res){
    try{
        const { userName, userId, userEmail, oldEmail, userPhone, isEmployer, companyId } = req.body;

        const updateProfile = await prisma.persona.update({
            where: {
                cedula: userId,
            },
            data:{
                nombre : userName,
                telefono : userPhone,
            }
        });

        if(userEmail !== oldEmail){
            const updateEmail = await prisma.credenciales.update({
                where: {
                    email: oldEmail,
                },
                data:{
                    email: userEmail,
                }
            });

        }

        const userData = { isEmployer: isEmployer, name: userName, email: userEmail, id: userId, companyId: companyId };
        const token = jwt.sign( {userData} , process.env.JWT_SECRET);
        res.status(200).json(token);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}