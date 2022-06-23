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
    
export default Aside;
