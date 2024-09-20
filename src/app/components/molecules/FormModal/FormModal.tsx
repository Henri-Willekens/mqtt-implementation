import './FormModal.scss';
import FormModalProps from './FormModal.types';

import Button from '../../atoms/Button/Button';
import ModalDialog from '../ModalDialog/ModalDialog';

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, cancelText, submitText, children }) => {
  const handleSubmit = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ModalDialog modalTitle='Change properties of element' isOpen={isOpen} onClose={onClose}>
      <div className='form-modal__form'>
        {children}
      </div>
      <div className='form-modal__action-buttons'>
        <Button onClick={handleCancel} value={cancelText} />
        <Button onClick={handleSubmit} value={submitText} />
      </div>
    </ModalDialog>
  );
};

export default FormModal;