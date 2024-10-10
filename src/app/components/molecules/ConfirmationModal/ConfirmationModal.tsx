import './ConfirmationModal.scss';
import ConfirmationModalProps from './ConfirmationModal.types';

import Button from '../../atoms/Button/Button';
import ModalDialog from '../ModalDialog/ModalDialog';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ modalTitle = 'Confirm choices?', isOpen, onCancel, onSubmit }) => {
  return (
    <ModalDialog modalTitle={modalTitle} isOpen={isOpen} onClose={onCancel}>
      <div className='confirmation-modal__action-buttons'>
        <Button onClick={onCancel} value='Cancel' />
        <Button onClick={onSubmit} value='Confirm' />
      </div>
    </ModalDialog>
  );
};

export default ConfirmationModal;