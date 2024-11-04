import './App.scss';

import { useEffect, useState, useRef } from 'react';

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
  const [topics, setTopics] = useState<string[]>([]); // State for topics
  const [selectedTopic, setSelectedTopic] = useState<string>(''); // State for selected topic
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // State to toggle dropdown visibility
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // State for highlighted index
  const dropdownRef = useRef<HTMLUListElement | null>(null); // Reference for dropdown

  const fetchConfigData = () => {
    const _fileToFetch = _activeConfigFile === 'ConfigA' ? 'config.json' : 'example.config.json';

    fetch(`/api/read-json?file=${_fileToFetch}`)
      .then((_response) => _response.json())
      .then((_results) => {
        setConfigData(_results);
      })
      .catch((_error) => console.error(_error));
  };

  // // Fetching topics from the backend only if config is enabled
  // useEffect(() => {
  //   if (_configEnabled) {
  //     fetch('http://localhost:4000/api/topics')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setTopics(data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching topics:', error);
  //       });
  //   }
  // }, [_configEnabled]); // Dependency array includes _configEnabled

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
