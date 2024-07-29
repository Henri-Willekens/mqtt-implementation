export default interface ConfirmationModalProps {
  isOpen: boolean,
  onClose: () => void,
  confirmText: string,
  cancelText: string
};