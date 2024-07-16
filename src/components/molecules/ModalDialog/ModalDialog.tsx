import { useEffect, useRef, useState } from "react";

import "./ModalDialog.scss";
import ModalDialogProps from "./ModalDialog.types";

const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, onClose, children }) => {
  const _dialogRef = useRef<HTMLDialogElement>(null);

  
  const handleClose = () => {
    onClose();
  }


  useEffect(() => {
    const dialog = _dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
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