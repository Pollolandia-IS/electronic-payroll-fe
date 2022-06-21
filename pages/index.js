import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Dashboard from "../components/Dashboard";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { cookies } = req;
    let decoded = null;
    if (cookies.token) {
      decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
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
            <Sidebar selected={1} username={props.name} />
            <Dashboard isEmployer={props.isEmployer} username={props.name} />
        </>
    );
}
