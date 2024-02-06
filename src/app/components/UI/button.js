import styles from "./button.module.css";

const Button = (props) => {
    let button = styles.withoutBorder;
    if (props.withBorder) {
        button = styles.withBorder;
    }

    return (
        <button styles={styles.button} type={props.type} className={`${button} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
