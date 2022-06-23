import EmployerBenefits from "../components/EmployerBenefits";
import EmployeeBenefits from "../components/EmployeeBenefits";
import jwt from "jsonwebtoken";
import { prisma } from "/.db";
import safeJsonStringify from 'safe-json-stringify';

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    const ids = JSON.parse(res._headers.ids);
    const employeeID = ids.id;
    const companyID = ids.companyId;
    const {userData} = jwt.verify(cookies.token, process.env.JWT_SECRET);
    let isEmployer = userData.isEmployer;
    if (isEmployer) {
        let benefitsQuery = await prisma.beneficios.findMany({
            where: {
                cedulaJuridica: companyID,
                habilitado: true,
            }, 
            orderBy: {
                nombreBeneficio: "asc"
            }
        });
        let projectQuery = await prisma.proyecto.findMany({
            where: {
                cedulaJuridica: companyID,
                habilitado: true,
            },
            select: {
                nombre: true,
                moneda: true,
            },
            orderBy: {
                nombre: "asc"
            }
        });
        const benefitString = JSON.parse(safeJsonStringify(benefitsQuery));
        const proyectString = JSON.parse(safeJsonStringify(projectQuery));

        return {
            props: {
                employerProps: {
                    companyID,
                    benefitString,
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
                habilitado: true,
            },
            select: {
                nombre: true,
                cantidadMaximaBeneficios: true,
                montoMaximoBeneficio: true,
            },
            orderBy: {
                nombre: "asc"
            }
        });
        const hired = await prisma.esContratado.findMany({
            where: {
                cedulaJuridica: companyID,
                cedulaEmpleado: employeeID,
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
        {props.isEmployer ? <EmployerBenefits props={props.employerProps} /> : <EmployeeBenefits props={props.employeeProps} />}
      </>
    );
};

export default Benefits;
