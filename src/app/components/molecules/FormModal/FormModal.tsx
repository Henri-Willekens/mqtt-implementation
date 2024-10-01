import './FormModal.scss';
import FormModalProps from './FormModal.types';

import Button from '../../atoms/Button/Button';
import ModalDialog from '../ModalDialog/ModalDialog';

const FormModal: React.FC<FormModalProps> = ({ isOpen, onCancel, onSubmit, children }) => {
  return (
    <ModalDialog modalTitle='Change properties of element' isOpen={isOpen} onClose={onCancel}>
      <div className='form-modal__form'>
        {children}
      </div>
      <div className='form-modal__action-buttons'>
        <Button onClick={onCancel} value='Cancel' />
        <Button onClick={onSubmit} value='Submit' />
      </div>
    </ModalDialog>
  );
};

export default FormModal;