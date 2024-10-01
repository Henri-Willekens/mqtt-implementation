import ButtonProps from './Button.types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({ onClick, value, extraClasses }) => {
  return (
    <div className={`button ${extraClasses}`} onClick={onClick}>
      <p className='button__label'>{value}</p>
    </div>
  );
};

export default Button;