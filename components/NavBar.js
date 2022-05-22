import styles from '../styles/NavBar.module.css';
import logo from '../public/assets/img/logo.svg';
import Image from 'next/image';
import Link from 'next/link';


function NavBar(props) {

  const createNavLinks = () => {
    return props.navItems.map(([name, isSelected, href]) => (
      <>
        <Link href={href} key={name}>
          <a className={`${styles.nav__item} ${isSelected ? styles.selected : ""}`}>{name}</a>
        </Link>
      </>
    ))
  }

  return ( 
    <header className={styles.header}>
      <Image className={styles.header__img} src={logo} alt="Pollolandia Logo" layout="raw"/>
      <nav className={styles.nav}>
        {createNavLinks()}
      </nav>
    </header>
  );
}

export default NavBar;
