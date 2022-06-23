import { prisma } from "/.db";

export default function handler(req, res) {
    if (req.method == "POST") {
        verifyUser(req, res);
    }
}

async function verifyUser(req, res) {
    try {
        const { userID } = req.body;
        const user = await prisma.hace_uso.findMany({
            where: {
                cedula: userID,
            },
            select: {
                email: true,
            },
        });

        console.log("USER:", user);
        if (user) {
            const credentials = await prisma.credenciales.update({
                where: {
                    email: user[0].email,
                },
                data: {
                    verificado: true,
                },
            });
            res.status(200).json(credentials);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
