import { useEffect, useState } from "react";

import Header from "./components/molecules/Header/Header";
import PageManager from "./components/organisms/PageManager/PageManager";
import ConfiguratorBar from "./components/molecules/ConfiguratorBar/ConfiguratorBar";


import config from "./configuration/new-config.json";
import { Config } from './configuration/types';

import "./App.scss";

const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState<string>('day');
  const [_gridEnabled, setGridEnabled] = useState(true);
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_activePageId, setActivePageId] = useState(1);


  const switchTheme = () => {
    if (_currentTheme == "day") {
      setCurrentTheme("night");
    } else {
      setCurrentTheme("day")
    }
  };


  const toggleGrid = () => {
    setGridEnabled(!_gridEnabled);
  };


  const toggleConfigMode = () => {
    setConfigEnabled(!_configEnabled);
  };


  const navigateToPage = (pageId: number) => {
    setActivePageId(pageId);
  };


  useEffect(() => {
    if (config.pages.length !== 0) {
      setConfigData(config as Config);
    } else {
      // fetch the config from mqtt or somewhere else
    }
  }, []);


  if (!_configData) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  };

  
  return(
    <div className={`filter filter__${_currentTheme}`}>
      <div className={_configEnabled ? "main main-config-mode" : "main"}>
        <Header pages={['page1', 'page2']} navigateToPage={navigateToPage} />
        <div className="components">
          <PageManager config={_configData} activePageId={_activePageId} />
        </div>
        {_configEnabled && <ConfiguratorBar />}
      </div>
    </div>
  );
};

export default App;

