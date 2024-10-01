export default interface FormModalProps {
  isOpen: boolean,
  onCancel: () => void,
  onSubmit: () => void,
  children: React.ReactNode
};