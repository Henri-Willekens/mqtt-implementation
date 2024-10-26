import HeaderProps from './Header.types';
import './Header.scss';

import { useContext, useState } from 'react';

import Button from '../../atoms/Button/Button';
import AlertBoxHeader from '../../atoms/AlertBoxHeader/AlertBoxHeader';
import FormModal from '../FormModal/FormModal';
import InputField from '../../atoms/FormInputs/InputField/InputField';
import ToggleField from '../../atoms/FormInputs/ToggleField/ToggleField';

import useFormInput from 'src/app/hooks/useFormInput';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { stringToBool } from 'src/app/services/stringToBool';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';

const Header: React.FC<HeaderProps> = () => { 
  const { _configData } = useContext(ConfigDataContext);
  const { _activePageId, setActivePageId } = useContext(ActivePageIdContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _currentTheme } = useContext(CurrentThemeContext);

  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    title: '',
    id: '',
    gridEnabled: 'false'
  });

  const { formValues, handleChange, resetForm } = useFormInput(_initialValues);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (_configData === null) {
      return;
    }

    // Make sure everything is the correct datatype
    _configData.pages.push({
      title: formValues.title.toString(),
      id: formValues.id.toString(),
      gridEnabled: stringToBool(formValues.gridEnabled.toString()),
      components: [],
      connections: []
    });

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_configData),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error saving data:', error));
  };

  const pageButtons = _configData?.pages.map((_page) => {
    if (_page.id == _activePageId) {
      return <Button key={_page.id} value={_page.title} onClick={() => setActivePageId(_page.id)} extraClasses='active' />;
    } else {
      return <Button key={_page.id} value={_page.title} onClick={() => setActivePageId(_page.id)} />;
    }
  });

  return(
    <>
      <div className={`navigation navigation__${_currentTheme}`}>
        <div className='navigation__block navigation__pages'>
          {_configData != null && _configData.pages.length < 10 ? pageButtons : <img src='./icons/general/apps.svg' className='navigation__pages-overview' onClick={() => setActivePageId('PagesOverview')} />}
          {_configEnabled && <Button value='+ Add new page' onClick={openModal} />}
        </div>
        <div className='navigation__block navigation__alerts'>
          {_configEnabled ? 
            <p className='navigation__config-mode-enabled'>Currently in configuration mode</p> : 
            <AlertBoxHeader 
              type='alarm' 
              status='unack' 
              title='GPS 1 failed' 
              description='GPS 1 has failed to fetch data from GPS sensor.'
            />
          }
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

      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal} >
        <InputField label='Page title' type='text' id='title' value={formValues.title} onChange={handleChange} />
        <InputField label='Page ID' type='text' id='id' value={formValues.id} onChange={handleChange} placeholder='example-id-for-page' />
        <ToggleField label='Grid enabled?' id='gridEnabled' isChecked={stringToBool(formValues.gridEnabled.toString())} onChange={handleChange} />
      </FormModal>
    </>
  );
};

export default Header;