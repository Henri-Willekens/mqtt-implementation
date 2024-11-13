export default interface FormModalProps {
  modalTitle?: string,
  isOpen: boolean,
  onCancel: () => void,
  onSubmit: () => void,
  onRemove?: () => void;
  children: React.ReactNode
};