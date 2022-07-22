import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Dashboard from "../components/Dashboard";
import { dateToString } from "../logic/DateTimeHelpers";
import Router from "next/router";
import { prisma } from "/.db";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    let decoded = null;
    if (cookies.token) {
      decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    }
    
    if (decoded.userData.isEmployer) {
        const id = decoded.userData.id;
        const hasCompany = await prisma.empresa.findMany({
            where: {
                cedulaEmpleador: id,
            },
        });
        if(hasCompany === undefined || hasCompany.length === 0) {
            return {
                redirect: {
                    destination: `/RegisterCompany?id=${id}`,
                    permanent: false,
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
            <Dashboard isEmployer={props.isEmployer} username={props.name} />
        </>
    );
}
