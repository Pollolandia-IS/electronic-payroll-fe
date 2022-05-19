import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import styles from '../../styles/Sidebar.module.css';


const SidebarItem = [
    {
        title: 'Nomina',
        icon: <AiIcons.AiFillProfile/>,
        link: '/'
    },
    {
        title: 'Ajustes',
        icon: <AiIcons.AiFillProject />,
        link: '/'
    },
    {
        title: 'Historial',
        icon: <AiIcons.AiFillProject />,
        link: '/'
    },
]

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarBody}>
          <ul className={styles.sidebarBodyList}>
            {SidebarItem.map(item => (
              <li key={item.title} className={styles.sidebarBodyListItem}>
                <a className={styles.sidebarBodyListItem} href={item.link}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
}
    
export default Sidebar;
