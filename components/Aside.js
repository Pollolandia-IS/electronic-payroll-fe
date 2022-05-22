import React from 'react';
import { BsCardText, BsGearFill, BsArrowCounterclockwise, BsPersonCircle, BsFillArrowRightSquareFill } from 'react-icons/bs';
import styles from '../../../styles/Sidebar.module.css';



// const SidebarItem = [
//     {
//         title: 'Nomina',
//         icon: <BsCardText/>,
//         link: '/'
//     },
//     {
//         title: 'Ajustes',
//         icon: <BsGearFill />,
//         link: '/'
//     },
//     {
//         title: 'Historial',
//         icon: <BsArrowCounterclockwise />,
//         link: '/'
//     },
//     {
//       title: 'Perfil',
//       icon: <BsPersonCircle />,
//       link: '/'
//   },
//   {
//     title: 'Cerrar Session',
//     icon: <BsFillArrowRightSquareFill />,
//     link: '/'
// },
// ]

const Sidebar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarBody}>
          <ul className={styles.sidebarBodyList}>
            {props.SidebarItem.map(item => (
              <li key={item.title} className={styles.sidebarBodyListItem}>
                <a className={styles.sidebarBodyListItem} href={item.link}>
                  {item.icon}
                  <span className={styles.objectSidebar}>{item.title}</span>
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
