import Link from 'next/link';
import styles from '../styles/AsideDropdown.module.css';

const AsideDropdown = (props) => {
    const createItems = () => {
      console.log(props.items);
        return props.items.map(([name, href], index) => {
          console.log(name, href);
            return (
            <li key={index}>
                <Link href={href}>
                    <a className={styles.asideDropdown__link}>{name}</a>
                </Link>
            </li>
            )
        })
    }
    return (
        <ul className={styles.asideDropdown}>
            {createItems()}
        </ul>
    )
}
export default AsideDropdown;
