import './ModalDialog.scss';
import ModalDialogProps from './ModalDialog.types';

import { useEffect, useRef } from 'react';

const ModalDialog: React.FC<ModalDialogProps> = ({ modalTitle, isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    onClose();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      };
    };
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onClose={handleClose} className='modal'>
      <div className='modal__header'>
        <p>{modalTitle}</p>
      </div>
      <div className='modal__content'>
        {children}
      </div>
    </dialog>
  );
};

export default ModalDialog;