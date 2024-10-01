import ToggleFieldProps from './ToggleField.types';
import './ToggleField.scss';

const ToggleField: React.FC<ToggleFieldProps> = ({ label, id, isChecked, onChange }) => {
  return(
    <div className='toggle-field__field'>
      <label className='toggle-field__label' htmlFor={id}>{label}</label>
      <div className='toggle-field__input__block checkbox-wrapper-64'>
        <label className='switch'>
          <input 
            type='checkbox' 
            id={id}
            name={id}
            checked={isChecked}
            onChange={onChange}
          />
          <span className='slider'></span>
        </label>
      </div>
    </div>
  )
};

export default ToggleField;