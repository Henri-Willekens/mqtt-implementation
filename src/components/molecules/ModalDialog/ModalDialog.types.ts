export default interface ModalDialogProps {
    modalTitle: string,
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
};