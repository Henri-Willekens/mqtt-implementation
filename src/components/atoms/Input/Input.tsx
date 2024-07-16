import "./Input.scss";
import InputProps from "./Input.types";

const Input: React.FC<InputProps> = ({ label, type }) => {
  return(
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      <input className="form-field__input" type={type} />
    </div>
  );
};

export default Input;