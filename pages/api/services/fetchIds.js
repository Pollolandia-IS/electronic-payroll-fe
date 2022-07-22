import { prisma } from "/.db";

const fetchIds = async (userEmail, fetchCompanyId) => {
    const user = await prisma.credenciales.findUnique({
        where: {
            email: userEmail,
        },
        include: {
            hace_uso: true,
        },
    });
    if (!user) {
        return null;
    }
    const id = user.hace_uso[0].cedula;
    if (fetchCompanyId == 'true') {
        const employer = await prisma.empleador.findUnique({
            where: {
                cedula: id,
            },
            include: {
                empresa: true,
            },
        });
        const employee = await prisma.empleado.findUnique({
            where: {
                cedula: id,
            },
        });

        if (!employer && !employee) {
            return null;
        }

        return {
            id,
            companyId: employer
                ? employer.empresa[0].cedulaJuridica
                : employee.cedulaJuridica,
        };
    } else {
        return {
            id,
        };
    }
};

export default async function handler(req, res) {
    if (req.method == "GET") {
        const ids = await fetchIds(req.headers.email, req.headers.fetchcompanyid);
        res.status(200).json(ids);
    }
}
