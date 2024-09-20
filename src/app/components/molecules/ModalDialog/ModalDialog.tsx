import './ModalDialog.scss';
import ModalDialogProps from './ModalDialog.types';

import { useEffect, useRef } from 'react';

const ModalDialog: React.FC<ModalDialogProps> = ({ modalTitle, isOpen, onClose, children }) => {
  const _dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    onClose();
  }

  useEffect(() => {
    const _dialog = _dialogRef.current;
    if (_dialog) {
      if (isOpen) {
        _dialog.showModal();
      } else {
        _dialog.close();
      };
    };
  }, [isOpen]);

  return (
    <dialog ref={_dialogRef} onClose={handleClose} className='modal'>
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