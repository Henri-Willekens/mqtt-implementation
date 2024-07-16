import "./Button.scss";
import ButtonProps from './Button.types';


const Button: React.FC<ButtonProps> = ({onClick, text}) => {
    return(
        <div onClick={onClick} className="button">
            <p className="button__label">{text}</p>
        </div>
    );
}

export default Button;