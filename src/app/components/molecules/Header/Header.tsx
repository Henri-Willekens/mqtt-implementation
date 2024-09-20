import HeaderProps from './Header.types';
import './Header.scss';

import { useState } from 'react';
import Button from '../../atoms/Button/Button';
import AlertBoxHeader from '../../atoms/AlertBoxHeader/AlertBoxHeader';
import FormModal from '../FormModal/FormModal';
import InputField from '../../atoms/FormInputs/InputField/InputField';
import { Config } from 'src/app/configuration/types';

const Header: React.FC<HeaderProps> = ({ pages, activePageId, configEnabled, navigateToPage }) => {
  
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_configData, setConfigData] = useState<Config>();
  const [_formValues, setFormValues] = useState({
  });
  
  const switchToPage = (id: string) => {
    navigateToPage(id);
  };

  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
      fetch('/api/read-json')
      .then((res) => res.json())
      .then((results) => { 
        setConfigData(results);
      })
      .catch((err) => console.error(err));
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleSave();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  const handleSave = () => {
    if (_configData === undefined) {
      return;
    }
  };

  const pageButtons = pages.map((_page) => {
    if (_page.id == activePageId) {
      return <Button key={_page.id} value={_page.title} onClick={() => switchToPage(_page.id)} extraClasses='active' />;
    } else {
      return <Button key={_page.id} value={_page.title} onClick={() => switchToPage(_page.id)} />;
    }
  });

  return(
    <div className='navigation'>
      <div className='navigation__block navigation__pages'>
        {pages.length < 10 ? pageButtons : <img src='./icons/general/apps.svg' className='navigation__pages-overview' onClick={() => switchToPage('PagesOverview')} />}
        <Button value='+' onClick={openModal} />
      </div>
      <div className='navigation__block navigation__alerts'>
        <AlertBoxHeader type='alarm' status='unack' />
      </div>
      <div className='navigation__block navigation__other'>
        <div className='navigation__block__icons'>
          <Button value='Alerts' onClick={() => switchToPage('AlertLog')} extraClasses={ activePageId == 'AlertLog' ? 'active' : ''} />
        </div>
        <div>
          <Button value='Settings' onClick={() => switchToPage('Settings')} extraClasses={ activePageId == 'Settings' ? 'active' : ''} />
        </div>
      </div>
    </div>
  );
};

export default Header;