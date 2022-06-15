import Link from 'next/link';
import Styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <div className={Styles.navbarContainer}>
            <div className={Styles.navbarLogo}>
                {/* <image src="../../../public/vercel.svg" alt="logo" /> */}
            </div>
            <div className={Styles.navbarLinks}>
                <div className={Styles.navbarLink}>
                    <Link href="/"><a>Home</a></Link>
                </div>
                <div className={Styles.navbarLink}>
                    <Link href="/Empleados"><a>Empleados</a></Link>
                </div>
                <div className={Styles.navbarLink}>
                    <Link href="/Proyectos"><a>Proyectos</a></Link>
                </div>
            </div>
        </div>
    );
    }

export default Navbar;