import ButtonProps from './Button.types';
import "./Button.scss";

const Button: React.FC<ButtonProps> = ({ extraClassName, onClick, text }) => {
  return (
    <div onClick={onClick} className={`button ${extraClassName}`}>
      <p className="button__label">{text}</p>
    </div>
  );
}

export default Button;