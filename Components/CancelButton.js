import Styles from '../styles/CancelButton.module.css';

function CancelButton(props){

    return(
        <button className={Styles.CancelButton} type="submit"> {props.ButtonText} </button>
    );
}

export default CancelButton;