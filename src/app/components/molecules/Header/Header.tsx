import HeaderProps from './Header.types';
import './Header.scss';

import { useContext, useState } from 'react';

import Button from '../../atoms/Button/Button';
import AlertBoxHeader from '../../atoms/AlertBoxHeader/AlertBoxHeader';
import FormModal from '../FormModal/FormModal';
import InputField from '../../atoms/FormInputs/InputField/InputField';

import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import ToggleField from '../../atoms/FormInputs/ToggleField/ToggleField';
import { ActivePageContext } from 'src/app/contexts/ActivePage';

const Header: React.FC<HeaderProps> = ({ configData, pages }) => {  
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId, setActivePageId } = useContext(ActivePageContext);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    title: '',
    id: '',
    gridEnabled: false
  });

  const openModal = () => {
    if (_configEnabled) {
      setIsModalOpen(true);
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormValues({
      title: '',
      id: '',
      gridEnabled: false
    });
  };

  const submitForm = () => {
    handleSave();
    closeModal();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    // Value is dependant on whether it's a checkbox or not
    const _value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  const handleSave = () => {
    if (configData === undefined) {
      return;
    }

    configData.pages.push({
      title: _formValues.title,
      id: _formValues.id,
      gridEnabled: _formValues.gridEnabled,
      components: []
    });

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configData),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error saving data:', error));
  };

  const pageButtons = pages.map((_page) => {
    if (_page.id == _activePageId) {
      return <Button key={_page.id} value={_page.title} onClick={() => setActivePageId(_page.id)} extraClasses='active' />;
    } else {
      return <Button key={_page.id} value={_page.title} onClick={() => setActivePageId(_page.id)} />;
    }
  });

  return(
    <>
      <div className='navigation'>
        <div className='navigation__block navigation__pages'>
          {pages.length < 10 ? pageButtons : <img src='./icons/general/apps.svg' className='navigation__pages-overview' onClick={() => setActivePageId('PagesOverview')} />}
          {_configEnabled && <Button value='+ Add new page' onClick={openModal} />}
        </div>
        <div className='navigation__block navigation__alerts'>
          {_configEnabled ? <p className='navigation__config-mode-enabled'>Currently in configuration mode</p> : <AlertBoxHeader type='alarm' status='unack' />}
        </div>
        <div className='navigation__block navigation__other'>
          <div className='navigation__block__icons'>
            <Button value='Alerts' onClick={() => setActivePageId('AlertLog')} extraClasses={ _activePageId == 'AlertLog' ? 'active' : ''} />
          </div>
          <div>
            <Button value='Settings' onClick={() => setActivePageId('Settings')} extraClasses={ _activePageId == 'Settings' ? 'active' : ''} />
          </div>
        </div>
      </div>

      <FormModal isOpen={_isModalOpen} onSubmit={submitForm} onCancel={closeModal} >
        <InputField label='Page title' type='text' id='title' value={_formValues.title} onChange={handleFormChange} />
        <InputField label='Page ID' type='text' id='id' value={_formValues.id} onChange={handleFormChange} placeholder='example-id-for-page' />
        <ToggleField label='Grid enabled?' id='gridEnabled' isChecked={_formValues.gridEnabled} onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default Header;