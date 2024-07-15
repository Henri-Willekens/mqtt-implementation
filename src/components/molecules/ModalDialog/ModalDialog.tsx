import { useEffect, useRef, useState } from "react";

import "./ModalDialog.scss";
import ModalDialogProps from "./ModalDialog.types";

const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, onClose, children }) => {
  const [_isModalOpen, setModalOpen] = useState(isOpen);
  const _modalRef = useRef<HTMLDialogElement | null>(null);


  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };


  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key == "Escape") {
      handleCloseModal();
    };
  };


  useEffect(() => {
    const _modalElement = _modalRef.current;

    if (_modalElement) {
      if (_isModalOpen) {
        _modalElement.showModal();
      } else {
        _modalElement.close();
      };
    };

    setModalOpen(isOpen);
  }, [isOpen]);


  return (
    <dialog ref={_modalRef} className="modal-dialog" onKeyDown={handleKeyDown}>
      <div onClick={handleCloseModal}>X</div>
      {children}
    </dialog>
  );
};

export default ModalDialog;