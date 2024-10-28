import ButtonProps from './Button.types';
import './Button.scss';

import { useContext } from 'react';

import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';

const Button: React.FC<ButtonProps> = ({ 
  value,
  onClick, 
  extraClasses 
}) => {
  const { _currentTheme } = useContext(CurrentThemeContext);

  return (
    <div className={`button ${extraClasses}`} onClick={onClick}>
      <p className={`button__label button__label__${_currentTheme}`}>{value}</p>
    </div>
  );
};

export default Button;