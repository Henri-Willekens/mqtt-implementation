import { useEffect, useRef, useState } from "react";

import "./ModalDialog.scss";
import ModalDialogProps from "./ModalDialog.types";

const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, onClose, children }) => {
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


  return(
    <dialog ref={_dialogRef} onClose={handleClose}>
      <div>
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </dialog>
  );
};

export default ModalDialog;