import {prisma} from '/.db'

export default function handler(req, res){
    if(req.method === "POST"){
        editPassword(req, res);
    }
}

async function editPassword(req, res){
    try{
        const { userEmail, newPassword } = req.body;

        const updatePassword = await prisma.credenciales.update({
            where: {
                email: userEmail,
            },
            data:{
                contrasenna : newPassword,
            }
        });
        res.status(200).json(updatePassword);
    } catch(error){
        res.status(500);
        res.send(error.message);
    }
}