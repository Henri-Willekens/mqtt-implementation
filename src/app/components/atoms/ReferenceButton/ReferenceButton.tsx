import './ReferenceButton.scss';
import ReferenceButtonProps from './ReferenceButton.types';

import { useContext, useState } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';

import useFormInput from 'src/app/hooks/useFormInput';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';

const ReferenceButton: React.FC<ReferenceButtonProps> = ({ 
  referencePageId = 'xxx'
}) => {
  const { _configEnabled } = useContext(ConfigEnabledContext);

  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    _referencePageId: referencePageId,
  });
  const { _formValues, handleChange } = useFormInput(_initialValues);

  const {setActivePageId} = useContext(ActivePageIdContext);

  const navigateToReferencedPage = () => {
    if (!_configEnabled) {
      setActivePageId(referencePageId);
    };
  };

  const openModal = () => {
    if (_configEnabled) {
      setIsModalOpen(true);
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <InputField label='Reference page ID' type='text' id='_referencePageId' value={_formValues._referencePageId} onChange={handleChange} />
        </div>
      </FormModal>
    </>
  );
};

export default ReferenceButton;