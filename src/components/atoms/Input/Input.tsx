import "./Input.scss";
import InputProps from "./Input.types";

const Input: React.FC<InputProps> = ({ label, type, value, id, name, onChange }) => {
  return(
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>{label}</label>
      <input 
        className="form-field__input" 
        type={type} 
        value={value} 
        id={id}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;