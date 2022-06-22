import EmployerBenefits from "../components/EmployerDeductions";
import EmployeeBenefits from "../components/EmployeeDeductions";
import jwt from "jsonwebtoken";
import { prisma } from "/.db";
import safeJsonStringify from "safe-json-stringify";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    console.log(res._headers.ids);
    const ids = JSON.parse(res._headers.ids);
    const employeeID = ids.id;
    const companyID = ids.companyId;
    const { userData } = jwt.verify(cookies.token, process.env.JWT_SECRET);
    let isEmployer = userData.isEmployer;
    if (isEmployer) {
        let deductionsQuery = await prisma.deduccionVoluntaria.findMany({
            where: {
                cedulaJuridica: companyID,
            },
        });
        let projectQuery = await prisma.proyecto.findMany({
            where: {
                cedulaJuridica: companyID,
            },
            select: {
                nombre: true,
                moneda: true,
            },
        });
        const deductionString = JSON.parse(safeJsonStringify(deductionsQuery));
        const proyectString = JSON.parse(safeJsonStringify(projectQuery));

        return {
            props: {
                employerProps: {
                    companyID,
                    deductionString,
                    proyectString,
                    name: userData.name,
                    isEmployer,
                },
                isEmployer,
            },
        };
    } else {
        let projects = await prisma.proyecto.findMany({
            where: {
                cedulaJuridica: companyID,
            },
            select: {
                nombre: true,
                moneda: true,
            },
        });
        const hired = await prisma.esContratado.findMany({
            where: {
                cedulaJuridica: companyID,
                cedulaEmpleado: employeeID,
            },
            select: {
                nombreProyecto: true,
                montoPago: true,
            },
        });

        const hiredIn = JSON.parse(safeJsonStringify(hired));
        const projectsString = JSON.parse(safeJsonStringify(projects));
        return {
            props: {
                employeeProps: {
                    employeeID,
                    companyID,
                    projectsString,
                    hiredIn,
                    employeeName: userData.name,
                    isEmployer,
                },
                isEmployer,
            },
        };
    }
}

const Benefits = (props) => {
    return (
        <>
            {props.isEmployer ? (
                <EmployerBenefits props={props.employerProps} />
            ) : (
                <EmployeeBenefits props={props.employeeProps} />
            )}
        </>
    );
};

export default Benefits;
