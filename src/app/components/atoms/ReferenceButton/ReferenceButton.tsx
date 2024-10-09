import './ReferenceButton.scss';
import ReferenceButtonProps from './ReferenceButton.types';

import { useContext, useState } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';

import { ActivePageContext } from 'src/app/contexts/ActivePage';

const ReferenceButton: React.FC<ReferenceButtonProps> = ({ 
  referencePageId = 'xxx', 
  configEnabled 
}) => {
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    _referencePageId: referencePageId,
  });

  const {setActivePageId} = useContext(ActivePageContext);

  const navigateToReferencedPage = () => {
    if (!configEnabled) {
      setActivePageId(referencePageId);
    };
  };

  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ..._formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return(
    <>
      <div onClick={navigateToReferencedPage} onDoubleClick={openModal} className='reference-button'>
        <p className='reference-button__text'>{referencePageId}</p>  
      </div>
      <FormModal isOpen={_isModalOpen} onCancel={handleCancel} onSubmit={handleSubmit}>
        <div>
          <InputField label='Reference page ID' type='text' id='_referencePageId' value={_formValues._referencePageId} onChange={handleFormChange} />
        </div>
      </FormModal>
    </>
  );
};

export default ReferenceButton;