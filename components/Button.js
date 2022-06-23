import styles from '../styles/Button.module.css';

const Button = (props) => {
    return(
        <button
            className={`${styles[props.BaseClass]} ${styles[props.SecundaryClass]}`}
            type={props.type}
            onClick={props.handleClick}>
            {props.ButtonText}
        </button>
    );
}

export default Button;
