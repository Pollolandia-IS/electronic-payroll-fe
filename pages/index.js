import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Dashboard from "../components/Dashboard";
import { dateToString } from "../logic/DateTimeHelpers";
import Router from "next/router";
import safeJsonStringify from "safe-json-stringify";
import { prisma } from "/.db";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    let decoded = null;
    if (cookies.token) {
      decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    }
    
    if (decoded.userData.isEmployer) {
        const id = JSON.parse(res._headers.id).id;
        const hasCompany = await prisma.empresa.findMany({
            where: {
                cedulaEmpleador: id,
            },
        });
        if(hasCompany === undefined || hasCompany.length === 0) {
            return {
                redirect: {
                    destination: "/RegisterCompany",
                    permanent: false,
                },
            };
        }else{
            let projects = await prisma.proyecto.findMany({
                where: {
                  cedulaJuridica: hasCompany[0].cedulaJuridica,
                  habilitado: true,
                },
                include: {
                  _count: {
                    select: {
                      esContratado: true,
                    },
                  },
                },
                orderBy: {
                    nombre: "asc"
                }
              });
            const projectsString = JSON.parse(safeJsonStringify(projects));
            let reports = await prisma.reporteHoras.findMany({
                where: {
                    cedulaJuridica: hasCompany[0].cedulaJuridica,
                    estado: 1,
                },
            });
            return {
                props: {
                    isEmployer: decoded ? decoded.userData.isEmployer : null,
                    name: decoded ? decoded.userData.name : null,
                    projectsString,
                    reports,
                    companyID: hasCompany[0].cedulaJuridica,
                },
            };
        }
        
    }
    return {
        props: {
            isEmployer: decoded ? decoded.userData.isEmployer : null,
            name: decoded ? decoded.userData.name : null,
        },
    };
}

export default function Home(props) {
    return (
        <>
            <Sidebar selected={1} username={props.name} isEmployer={props.isEmployer} />
            {props.isEmployer ? (
                <Dashboard
                    isEmployer={props.isEmployer}
                    username={props.name}
                    projectsString={props.projectsString}
                    companyID={props.companyID}
                    reports={props.reports}
                />
            ) : (
                <Dashboard
                    isEmployer={props.isEmployer}
                    username={props.name}
                />
            )}
        </>
    );
}
