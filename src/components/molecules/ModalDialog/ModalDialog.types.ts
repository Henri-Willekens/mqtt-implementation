export default interface ModalDialogProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
};