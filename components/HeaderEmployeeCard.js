import ButtonAddSelection from './ButtonAddSelection';
import SearchBar from './SearchBar';
import styles from "../styles/HeaderEmployeeCard.module.css";

const HeaderEmployeeCard = (props) => {
    return (
      <div className={styles.content}>
        <div className={styles.top}>
          <SearchBar
            handleChange={props.handleTextChange}
            searchText={props.searchText}
            placeholder={props.placeText}
          />
          <ButtonAddSelection
            handleOpenModal={props.handleOpenModal}
            className={styles.button}
            text={props.buttonText}
            textSecondary={"5 Seleccionados"}
            isSelected={props.isSelected}
          />
        </div>
        <div className={styles.bottom}>
          <span>{props.textSecondary}</span>
        </div>
      </div>
    );
}

export default HeaderEmployeeCard;
