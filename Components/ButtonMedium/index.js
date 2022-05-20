import Styles from '../../styles/ButtonMedium.module.css';

function ButtonMedium(props){

    return(
        <button className={Styles.ButtonMedium} type="submit"> {props.ButtonText} </button>
    );
}

export default ButtonMedium;