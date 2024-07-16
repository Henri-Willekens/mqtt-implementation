import Button from "../../atoms/Button/Button";
import ModalDialog from "../ModalDialog/ModalDialog";

import "./FormModal.scss";
import FormModalProps from "./FormModal.types";

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  return(
    <ModalDialog modalTitle="Change properties of element" isOpen={isOpen} onClose={onClose}>
      <div className="form-modal__form">
        <div>
          <label>ID</label>
          <input type="text" />
        </div>
        <div>
          <label>Label</label>
          <input type="text" />
        </div>
        <div>
          <label>Width</label>
          <input type="text" />
        </div>
        <div>
          <label>Height</label>
          <input type="text" />
        </div>
      </div>
      <div className="form-modal__action-buttons">
        <Button onClick={onClose} text="Cancel changes" />
        <Button onClick={onClose} text="Save changes" />
      </div>
    </ModalDialog>
  );
};

export default FormModal;