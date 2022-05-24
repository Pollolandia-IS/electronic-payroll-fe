import { BsSearch } from "react-icons/bs";
import Styles from "../styles/SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <div className={Styles.search}>
      <div className={Styles.searchInputs}>
        <div className={Styles.searchIcon}>
          <BsSearch />
        </div>
        <input className={Styles.test}
          type="text"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBar;