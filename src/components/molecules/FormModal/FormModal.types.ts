export default interface FormModalProps {
  isOpen: boolean,
  onClose: () => void,
  cancelText: string,
  submitText: string
};