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
        <option id=''>none</option>
        {options.map((_option) => (
          <option key={_option} id={_option}>{_option}</option>
        ))}
      </select>
    </div>
  )
};

export default SelectField;