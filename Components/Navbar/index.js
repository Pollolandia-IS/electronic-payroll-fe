import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
            <image src="https://i.imgur.com/eQhUw7D.png" alt="logo" />
            </div>
            <div className="navbar-links">
            <div className="navbar-link">
                <Link href="/"><a>Home</a></Link>
            </div>
            <div className="navbar-link">
                <Link href="/Empleados"><a>Empleados</a></Link>
            </div>
            <div className="navbar-link">
                <Link href="/Proyectos"><a>Proyectos</a></Link>
            </div>
            </div>
        </div>
        </div>
    );
    }

export default Navbar;