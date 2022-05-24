import { BsSearch } from "react-icons/bs";
import styles from "../styles/SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <div className={styles.searchIcon}>
          <BsSearch />
        </div>
        <input className={styles.test}
          type="text"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBar;