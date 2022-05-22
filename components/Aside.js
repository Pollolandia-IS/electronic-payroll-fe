import AsideItem from "./AsideItem"
import styles from "../styles/Aside.module.css"

const Aside = (props) => {
    const createItems = () => {
        return props.items.map((item, index) => {
            return <AsideItem key={index} item={item} />
        })
    }

    return (
        <aside className={styles.aside}>
          <ul className={styles.aside__list}>
            {createItems()}
          </ul>
        </aside>
    )
}

// const Sidebar = (props) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.sidebar}>
//         <div className={styles.sidebarBody}>
//           <ul className={styles.sidebarBodyList}>
//             {props.SidebarItem.map(item => (
//               <li key={item.title} className={styles.sidebarBodyListItem}>
//                 <a className={styles.sidebarBodyListItem} href={item.link}>
//                   {item.icon}
//                   <span className={styles.objectSidebar}>{item.title}</span>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>

//   );
// }
    
export default Aside;
