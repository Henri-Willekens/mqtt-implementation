import './App.scss';

import { useEffect, useState } from 'react';

import Header from './components/molecules/Header/Header';
import PageManager from './components/organisms/PageManager/PageManager';
import Library from './components/molecules/Library/Library';

import { ThemeContext } from './contexts/Theme';
import { ConfigEnabledContext } from './contexts/ConfigEnabled';
import { ConfigFileContext } from './contexts/ConfigFile';
import { Config } from './configuration/types';

import config from './configuration/config.json';
import exampleconfig from './configuration/example.config.json';


const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState('day');
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_activePageId, setActivePageId] = useState('Settings');
  const [_activeConfig, setActiveConfig] = useState('ConfigA');

  const navigateToPage = (_pageId: string) => {
    setActivePageId(_pageId);
  };

  const fetchConfig = () => {
    const _fileToFetch = _activeConfig == 'ConfigA' ? 'config.json' : 'example.config.json';
    fetch(`/api/read-json?file=${_fileToFetch}`)
      .then((_res) => _res.json())
      .then((_results) => {
        setConfigData(_results);
      })
      .catch((_err) => console.error(_err));
  };

  useEffect(() => {
    fetchConfig();
  }, [_activeConfig]);

  return (
    <div className='app'>
      <ThemeContext.Provider value={{ _currentTheme, setCurrentTheme }}>
        <div className={`filter filter__${_currentTheme}`}>
          <ConfigEnabledContext.Provider value={{ _configEnabled, setConfigEnabled }}>
            <div className={_configEnabled ? 'main main-config-mode' : 'main'}>
              {_configData === null ? (
                <div className='loading'>
                  <div className='loader'></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <Header configData={config} pages={config.pages} navigateToPage={navigateToPage} activePageId={_activePageId} />
                  <div className='components'>
                    {/* <ActivePageContext.Provider value={{ _activePageId, setActivePageId }} /> */}
                    <ConfigFileContext.Provider value={{ _activeConfig, setActiveConfig }}>
                      <PageManager config={_configData} activePageId={_activePageId} />
                    </ConfigFileContext.Provider>
                  </div>
                  {_configEnabled && <Library activePageId={_activePageId} config={config} />}
                </>
              )}
            </div>
          </ConfigEnabledContext.Provider>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;

