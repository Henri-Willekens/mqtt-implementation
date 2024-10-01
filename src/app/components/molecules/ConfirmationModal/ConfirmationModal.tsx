import './ConfirmationModal.scss';
import ConfirmationModalProps from './ConfirmationModal.types';

import Button from '../../atoms/Button/Button';
import ModalDialog from '../ModalDialog/ModalDialog';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, cancelText, confirmText }) => {
  const handleConfirm = () => {
    // Do something to confirm?
    onClose();
  };

  const handleCancel = () => {
    // Do something to cancel?
    onClose();
  };

  return (
    <ModalDialog modalTitle='Save current changes' isOpen={isOpen} onClose={onClose}>
      <div className='confirmation-modal__action-buttons'>
        <Button onClick={handleConfirm} value={cancelText} />
        <Button onClick={handleCancel} value={confirmText} />
      </div>
    </ModalDialog>
  );
};

export default ConfirmationModal;