import LibraryProps from './Library.types';
import './Library.scss';

import { useContext, useState } from 'react';

import Button from '../../atoms/Button/Button';
import FormModal from '../FormModal/FormModal';
import SelectField from '../../atoms/FormInputs/SelectField/SelectField';
import InputField from '../../atoms/FormInputs/InputField/InputField';

import useFormInput from 'src/app/hooks/useFormInput';
import componentMap from '../../index';
import {v4 as uuidv4} from 'uuid';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const Library: React.FC<LibraryProps> = ({
  config
}) => {
  const { setConfigData } = useContext(ConfigDataContext);
  const { _activePageId } = useContext(ActivePageIdContext);

  const [_isLibraryOpen, setIsLibraryOpen] = useState(false);

  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValuesNewConnection, setInitialValuesNewConnection] = useState({
    fromId: '',
    toId: '',
    type: '',
    content: ''
  });
  const { formValues, handleChange, resetForm } = useFormInput(_initialValuesNewConnection);

  const elementButtons = () => {
    const buttons: any[] = [];
    
    for (let component in componentMap) {
      buttons.push(
        <Button key={component} value={`${component}`} onClick={() => createElementOnPage(component)} extraClasses='library__create-button' />
      );
    };

    buttons.push(
      <Button value='Connection' onClick={openCreateConnectionModal} extraClasses='library__create-button' />
    )
    
    return buttons;
  };

  const openCreateConnectionModal = () => {
    if (_activePageId == 'Settings' || _activePageId == 'AlertLog' || _activePageId == 'PagesOverview') {
      return;
    };
  
    setIsModalOpen(true);
  };

  const closeCreateConnectionModal = () => {
    setIsModalOpen(false);
    fetch('/api/read-json?file=config.json')
      .then((res) => res.json())
      .then((results) => { 
        setConfigData(results);
      })
      .catch((err) => console.error(err));  
  };

  const createElementOnPage = (typeOfElement: string) => {
    // Should not be able to do this on settings, alert log or pages overview
    if (_activePageId == 'Settings' || _activePageId == 'AlertLog' || _activePageId == 'PagesOverview') {
      return;
    }
    
    setIsLibraryOpen(false); // Close library

    const element = {
      type: typeOfElement,
      props: {
        xPos: 50,
        yPos: 50,
        id: `${typeOfElement}-${uuidv4()}`
      }
    };

    let pageIndex = config?.pages.findIndex((_o) => _o.id === _activePageId);

    config.pages[pageIndex].components.push(element);

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .then(() => setConfigData(config))
      .catch((error) => console.error('Error saving data:', error));

      fetch('/api/read-json?file=config.json')
        .then((res) => res.json())
        .then((results) => { 
          setConfigData(results);
        })
        .catch((err) => console.error(err));  
  };

  const handleSubmit = () => {
    const connection = {
      from: formValues.fromId.toString(),
      to: formValues.toId.toString(),
      type: formValues.type.toString(),
      content: formValues.content.toString()
    };

    let pageIndex = config.pages.findIndex((_o) => _o.id === _activePageId);

    config.pages[pageIndex].connections?.push(connection);

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .catch((error) => console.error('Error saving data:', error));

    closeCreateConnectionModal();
    resetForm();
  }

  return(
    <div className={`library ${_isLibraryOpen ? 'library-open' : ''}`}>
      {_isLibraryOpen && 
        <div className='library__libary'>
          {elementButtons()}
        </div>
      }
      <div className='library__open-button'>
        <Button onClick={() => setIsLibraryOpen(!_isLibraryOpen)} value={`${_isLibraryOpen ? 'Hide' : 'Show'} library`} />
      </div>
      <FormModal modalTitle='Create a new connection' isOpen={_isModalOpen} onCancel={closeCreateConnectionModal} onSubmit={handleSubmit}>
        <InputField type='text' label='From' id='fromId' value={formValues.fromId} onChange={handleChange} />
        <InputField type='text' label='To' id='toId' value={formValues.toId} onChange={handleChange} />
        <SelectField label='Type' id='type' value={formValues.type.toString()} options={['connection', 'pipe']} onChange={handleChange} />
        <SelectField label='Content' id='content' value={formValues.content.toString()} options={['fuel', 'oil', 'sea-water', 'clean-water']} onChange={handleChange} />
      </FormModal>
    </div>
  );
};

export default Library;