import ButtonProps from './Button.types';
import "./Button.scss";

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <div onClick={onClick} className="button">
      <p className="button__label">{text}</p>
    </div>
  );
}

export default Button;