import { useEffect, useState } from "react";

import "./App.scss";
import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
import Button from "./components/atoms/Button/Button";

import config from "./configuration/config.json";
import { Config } from './configuration/types';
import ConfiguratorBar from "./components/molecules/ConfiguratorBar/ConfiguratorBar";


const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState<string>('day');
  const [_configModeEnabled, setConfigModeEnabled] = useState(false);


  const switchTheme = () => {
    if (_currentTheme == "day") {
      setCurrentTheme("night");
    } else {
      setCurrentTheme("day")
    }
  };


  const switchConfigMode = () => {
    if (_configModeEnabled) {
      setConfigModeEnabled(false);
    } else {
      setConfigModeEnabled(true);
    }
  };


  useEffect(() => {
    if (config.components.length !== 0) {
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
      <div className="main main-config-mode">
        <Header pages={['page1', 'page2']} />
        <div className="components">
          <Button onClick={switchTheme} text={`Wisselen van theme`} />
          <Button onClick={switchConfigMode} text={`Config mode`} />
          <DynamicRenderComponents theme={_currentTheme} config={_configData} />
        </div>
        {_configModeEnabled && <ConfiguratorBar />}
      </div>
    </div>
  );
};

export default App;