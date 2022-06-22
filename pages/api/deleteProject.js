import {prisma} from '/.db';

export default function handler (req, res) {
    if (req.method == "POST") {
        deleteProject(req, res);
    }
}

async function deleteProject (req, res) {
    try {
        const { companyID, projectName } = req.body;
        const newName = 'Borrado: ' + projectName;
        const updateProject = await prisma.proyecto.update({
            where: {
                cedulaJuridica_nombre: {
                    cedulaJuridica: companyID,
                    nombre: projectName,
                }
            }, data: {
                nombre: newName,
                habilitado: false,
            },
        });
        res.status(200).json(updateProject);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
