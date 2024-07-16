import "./Input.scss";
import InputProps from "./Input.types";

const Input: React.FC<InputProps> = ({ label, type, value }) => {
  return(
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      <input className="form-field__input" type={type} value={value} />
    </div>
  );
};

export default Input;