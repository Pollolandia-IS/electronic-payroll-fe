import {prisma} from '/.db';
const { sendAlertDeletedEntireProject } = require("/pages/api/services/mailServices");

export default function handler (req, res) {
    if (req.method == "POST") {
        deleteProject(req, res);
    }
}

async function deleteProject (req, res) {
    /*try {*/
        const { companyID, projectName } = req.body;
        const newName = 'Borrado: ' + projectName;
        const employeesEmail = await getEmails(
            res,
            companyID,
            projectName
        );
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
        console.log("pene");
        for (let i = 0; i < employeesEmail.length; i++) {
            console.log("pene2");
            console.log(employeesEmail[i].email);
            await sendAlertDeletedEntireProject(
                employeesEmail[i].email,
                projectName
            );
        }
        res.status(200).json(updateProject);
    /*} catch (error) {
        res.status(500);
        res.send(error.message);
    }*/
};

async function getEmails(res, companyID, projectName) {
    try {
        console.log("llegue a getEmails");
        const employeesEmail = await prisma.$queryRaw`
        SELECT email FROM hace_uso INNER JOIN esContratado ON esContratado.cedulaEmpleado = hace_uso.cedula
        AND esContratado.nombreProyecto = ${projectName}
        AND esContratado.cedulaJuridica = ${companyID};`;

        return employeesEmail;
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}