import ButtonAddSelection from './ButtonAddSelection';
import SearchBar from './SearchBar';
import Styles from "../styles/HeaderEmployeeCard.module.css";

const HeaderEmployeeCard = (props) => {
    return (
        <div className={Styles.content}>
            <div className={Styles.top}> 
                <SearchBar placeholder={props.placeText}/>
                <ButtonAddSelection className={Styles.button} text={props.buttonText} textSecondary={"5 Seleccionados"}/>
            </div>
            <div className={Styles.bottom}> 
                <span>{props.textSecondary}</span>
            </div>
        </div>
    );
}

export default HeaderEmployeeCard;
