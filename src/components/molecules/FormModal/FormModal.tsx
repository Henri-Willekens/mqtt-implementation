import Button from "../../atoms/Button/Button";
import ModalDialog from "../ModalDialog/ModalDialog";
import Input from "../../atoms/Input/Input";

import "./FormModal.scss";
import FormModalProps from "./FormModal.types";

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, cancelText, submitText }) => {
  const handleSubmit = () => {
    onClose();
  };


  const handleCancel = () => {
    onClose();
  }


  return(
    <ModalDialog modalTitle="Change properties of element" isOpen={isOpen} onClose={onClose}>
      <div className="form-modal__form">
        <Input label="ID" type="text" />
        <Input label="Max value" type="number" />
        <Input label="Unit" type="text" />
        <Input label="Width" type="number" />
        <Input label="Height" type="number" />
      </div>
      <div className="form-modal__action-buttons">
        <Button onClick={handleCancel} text={cancelText} />
        <Button onClick={handleSubmit} text={submitText} />
      </div>
    </ModalDialog>
  );
};

export default FormModal;