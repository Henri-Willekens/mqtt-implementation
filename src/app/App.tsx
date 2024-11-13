import './App.scss';

import { useEffect, useState } from 'react';

import Header from './components/molecules/Header/Header';
import PageManager from './components/organisms/PageManager/PageManager';
import Library from './components/molecules/Library/Library';

import { CurrentThemeContext } from './contexts/CurrentTheme';
import { ConfigEnabledContext } from './contexts/ConfigEnabled';
import { ActiveConfigFileContext } from './contexts/ActiveConfigFile';
import { ActivePageIdContext } from './contexts/ActivePageId';
import { ConfigDataContext } from './contexts/ConfigData';

import { Config } from './configuration/types';

const App = () => {
  const [_currentTheme, setCurrentTheme] = useState('day');
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_activeConfigFile, setActiveConfigFile] = useState('ConfigA');
  const [_activePageId, setActivePageId] = useState('Settings');
  const [_configData, setConfigData] = useState<Config | null>(null);

  const fetchConfigData = () => {
    const _fileToFetch = _activeConfigFile === 'ConfigA' ? 'config.json' : 'example.config.json';

    fetch(`/api/read-json?file=${_fileToFetch}`)
      .then((_response) => _response.json())
      .then((_results) => {
        setConfigData(_results);
      })
      .catch((_error) => console.error(_error));
  };

  useEffect(() => {
    fetchConfigData();
  }, [_activeConfigFile]);


  return (
    <div className='app'>
      <CurrentThemeContext.Provider value={{ _currentTheme, setCurrentTheme }}>
        <div className={`filter filter__${_currentTheme}`}>
          <ConfigEnabledContext.Provider value={{ _configEnabled, setConfigEnabled }}>
            <div className={_configEnabled ? 'main main-config-mode' : 'main'}>
              {_configData === null ? (
                <div className='loading'>
                  <div className='loader'></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <ActivePageIdContext.Provider value={{ _activePageId, setActivePageId }}>
                  <ConfigDataContext.Provider value={{ _configData, setConfigData }}>
                    <Header />
                    <div className='components'>
                      <ActiveConfigFileContext.Provider value={{ _activeConfigFile, setActiveConfigFile }}>
                        <PageManager />
                      </ActiveConfigFileContext.Provider>
                    </div>
                    {_configEnabled && <Library config={_configData} />}
                   
                  </ConfigDataContext.Provider>
                </ActivePageIdContext.Provider>
              )}
            </div>
          </ConfigEnabledContext.Provider>
        </div>
      </CurrentThemeContext.Provider>
    </div>
  );
};

export default App;
