import LibraryProps from './Library.types';
import './Library.scss'

import { useContext, useState } from 'react';

import componentMap from '../../index';
import Button from '../../atoms/Button/Button';

import {v4 as uuidv4} from 'uuid';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const Library: React.FC<LibraryProps> = ({ activePageId, config }) => {
  const { setConfigData } = useContext(ConfigDataContext);
  const [_isLibraryOpen, setIsLibraryOpen] = useState(false);

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
    </div>
  )
};

export default Library;