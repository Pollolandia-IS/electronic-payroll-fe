import jwt from "jsonwebtoken";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile"
import styles from "/styles/profile.module.css";

export async function getServerSideProps(context) {
    const { req, res } = context;
    console.log('headers ', res._headers.userdata);
    const userData = JSON.parse(res._headers.userdata);
    const { cookies } = req;
    let decoded = null;
    if (cookies.token) {
      decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    }

    let credentialsQuery = await prisma.credenciales.findUnique({
        where: {
            email: userData.email,
        },
        include: {
            hace_uso: {
                select: {
                    cedula: true,
                }
            },
        }
    });

    let userQuery = await prisma.persona.findUnique({
        where: {
            cedula: credentialsQuery.hace_uso[0].cedula,
        },
        select: {
            nombre: true,
            telefono: true,
        }
    });
    console.log(credentialsQuery, 'persona', userQuery);
    return {
        props: {
            isEmployer: decoded ? decoded.userData.isEmployer : null,
            name: decoded ? decoded.userData.name : null,
        },
    };
}

export default function ProfilePage (props) {
    
    return(
        <>
            <Sidebar selected={1} username={props.name} isEmployer={props.isEmployer} />
            <main className={styles.main}>
                <Profile/>
            </main>
        </>
    )
}
