import "./Button.scss";
import ButtonProps from './Button.types';


const Button: React.FC<ButtonProps> = ({onclick, text}) => {
    
    return(
        <div onClick={onclick} className="button">
            <p>{text}</p>
        </div>
    );
}

export default Button;