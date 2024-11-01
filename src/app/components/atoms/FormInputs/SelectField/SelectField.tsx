import './SelectField.scss'
import SelectFieldProps from './SelectField.types';

const SelectField: React.FC<SelectFieldProps> = ({
  label = '',
  id = '',
  value = '',
  options,
  onChange
}) => {
  return(
    <div className='select-field__field'>
      <label className='select-field__label' htmlFor={id}>{label}</label>
      <select onChange={onChange} id={id} name={id} value={value} className='select-field__input'>
        <option value='none' id='none'>None</option>
        {options.map((option) => (
          <option key={option.value} id={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
};

export default SelectField;