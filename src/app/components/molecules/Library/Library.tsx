import LibraryProps from './Library.types';
import './Library.scss'

import { useContext, useState } from 'react';

import componentMap from '../../index';
import Button from '../../atoms/Button/Button';

import {v4 as uuidv4} from 'uuid';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import FormModal from '../FormModal/FormModal';
import SelectField from '../../atoms/FormInputs/SelectField/SelectField';
import InputField from '../../atoms/FormInputs/InputField/InputField';

const Library: React.FC<LibraryProps> = ({ activePageId, config }) => {
  const { setConfigData } = useContext(ConfigDataContext);
  const [_isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValuesNewConnection, setFormValuesNewConnection] = useState({
    _fromId: '',
    _toId: '',
    _type: '',
    _content: ''
  });

  const showLibrary = () => {
    setIsLibraryOpen(!_isLibraryOpen);
  };

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

  const createElementOnPage = (_typeOfElement: string) => {
    // Should not be able to do this on settings, alert log or pages overview
    if (activePageId == 'Settings' || activePageId == 'AlertLog' || activePageId == 'PagesOverview') {
      return;
    }
    
    setIsLibraryOpen(false); // Close library

    const _element = {
      type: _typeOfElement,
      props: {
        xPos: 50,
        yPos: 50,
        id: `${_typeOfElement}-${uuidv4()}`
      }
    };

    let _pageIndex = config.pages.findIndex((_o) => _o.id === activePageId);

    config.pages[_pageIndex].components.push(_element);

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .then(() => setConfigData(config))
      .catch((error) => console.error('Error saving data:', error));
  };

  const openCreateConnectionModal = () => {
    if (activePageId == 'Settings' || activePageId == 'AlertLog' || activePageId == 'PagesOverview') {
      return;
    };

    setIsModalOpen(true);
    setIsLibraryOpen(false);
  }

  const closeCreateConnectionModal = () => {
    setIsModalOpen(false);
  };

  const createConnection = () => {
    const _connection = {
      from: _formValuesNewConnection._fromId,
      to: _formValuesNewConnection._toId,
      type: _formValuesNewConnection._type,
      content: _formValuesNewConnection._content
    };

    let _pageIndex = config.pages.findIndex((_o) => _o.id === activePageId);

    config.pages[_pageIndex].connections?.push(_connection);

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .catch((error) => console.error('Error saving data:', error));
    
    closeCreateConnectionModal();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValuesNewConnection((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  return (
    <div className={`library ${_isLibraryOpen ? 'library-open' : ''}`}>
      {_isLibraryOpen && 
        <div className='library__libary'>
          {elementButtons()}
        </div>
      }
      <div className='library__open-button'>
        <Button onClick={showLibrary} value={`${_isLibraryOpen ? 'Hide' : 'Show'} library`} />
      </div>
      <FormModal modalTitle='Create a new connection' isOpen={_isModalOpen} onCancel={closeCreateConnectionModal} onSubmit={createConnection}>
        <InputField type='text' label='From' id='_fromId' value={_formValuesNewConnection._fromId} onChange={handleFormChange} />
        <InputField type='text' label='To' id='_toId' value={_formValuesNewConnection._toId} onChange={handleFormChange} />
        <SelectField label='Type' id='_type' value={_formValuesNewConnection._type} options={['connection', 'pipe']} onChange={handleFormChange} />
        <SelectField label='Content' id='_content' value={_formValuesNewConnection._content} options={['fuel', 'oil', 'sea-water', 'clean-water']} onChange={handleFormChange} />
      </FormModal>
    </div>
  )
};

export default Library;