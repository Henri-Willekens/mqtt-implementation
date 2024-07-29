import ButtonProps from './Button.types';
import "./Button.scss";

const Button: React.FC<ButtonProps> = ({ ExtraclassName, onClick, text }) => {
  return (
    <div onClick={onClick} className={`button ${ExtraclassName}`}>
      <p className="button__label">{text}</p>
    </div>
  );
}

export default Button;