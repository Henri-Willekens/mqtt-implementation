import './FormModal.scss';
import FormModalProps from './FormModal.types';

import Button from '../../atoms/Button/Button';
import ModalDialog from '../ModalDialog/ModalDialog';

const FormModal: React.FC<FormModalProps> = ({ modalTitle = 'Change properties of element', isOpen, onCancel, onSubmit, onRemove, children }) => {
  return (
    <ModalDialog modalTitle={modalTitle} isOpen={isOpen} onClose={onCancel}>
      <div className='form-modal__form'>
        {children}
      </div>
      <div className='form-modal__action-buttons'>
        <Button onClick={onCancel} value='Cancel' />
        {onRemove && <Button onClick={onRemove} value='Remove' />}
        <Button onClick={onSubmit} value='Submit' />

      </div>
    </ModalDialog>
  );
};

export default FormModal;