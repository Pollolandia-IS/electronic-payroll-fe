import jwt from "jsonwebtoken";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile"
import styles from "/styles/profile.module.css";

export async function getServerSideProps(context) {
    const { req, res } = context;
    const userIds = JSON.parse(res._headers.ids);
    const userData = JSON.parse(res._headers.userdata);
    const { cookies } = req;
    let decoded = null;
    if (cookies.token) {
      decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    }

    let credentialsQuery = await prisma.credenciales.findUnique({
        where: {
            email: userData.email,
        }
    });

    let userQuery = await prisma.persona.findUnique({
        where: {
            cedula: userIds.id,
        }
    });

    let userCompanyQuery = await prisma.empresa.findUnique({
        where: {
            cedulaJuridica: userIds.companyId,
        }
    });

    let profileUserData = {
        name: userQuery.nombre,
        id: userQuery.cedula,
        phone: userQuery.telefono,
        email: credentialsQuery.email,
        password: credentialsQuery.contrasenna,
    };

    let profileCompanyData = {
        name: userCompanyQuery.razonSocial,
        legalid: userCompanyQuery.cedulaJuridica,
        phone: userCompanyQuery.telefono,
        email: userCompanyQuery.email,
        address: userCompanyQuery.direccion,
    };

    return {
        props: {
            isEmployer: decoded ? decoded.userData.isEmployer : null,
            userData: profileUserData,
            companyData: profileCompanyData,
        },
    };
}

export default function ProfilePage (props) {
    
    return(
        <>
            <Sidebar selected={1} username={props.userData.name} isEmployer={props.isEmployer} />
            <main className={styles.main}>
                <Profile userData={props.userData} companyData={props.companyData} isEmployer={props.isEmployer}/>
            </main>
        </>
    )
}
