import InputFieldProps from './InputField.types';
import './InputField.scss';

const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, onChange }) => {
  return(
    <div className='input-field__field'>
      <label className='input-field__label'>{label}</label>
      <input 
        type={type}
        id={id}
        name={id}
        value={value.toString()}
        onChange={onChange}
        className='input-field__input'
      />
    </div>
  );
};

export default InputField;