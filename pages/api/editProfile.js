import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        editProfile(req, res);
    }
}

async function editProfile(req, res){
    try{
        const { userName, userId, oldId, userEmail, oldEmail, userPhone } = req.body;

        console.log(req.body);
        const updateProfile = await prisma.persona.update({
            where: {
                cedula: oldId,
            },
            data:{
                cedula : userId,
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
        res.status(200).json(updateProfile);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}