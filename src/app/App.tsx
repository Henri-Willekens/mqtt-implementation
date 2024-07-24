import { useEffect, useState } from "react";

import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
import Button from "./components/atoms/Button/Button";
import { Grid } from './components/atoms/Grid/Grid';
import ConfirmationModal from "./components/molecules/ConfirmationModal/ConfirmationModal";
import ConfiguratorBar from "./components/molecules/ConfiguratorBar/ConfiguratorBar";

import config from "./configuration/config.json";
import { Config } from './configuration/types';

import "./App.scss";

const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState<string>('day');
  const [_gridEnabled, setGridEnabled] = useState(false);
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);


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


  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };


  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  }

  
  return(
    <div className={`filter filter__${_currentTheme}`}>
      <div className={_configEnabled ? "main main-config-mode" : "main"}>
        <Header pages={['page1', 'page2']} />
        <div className="components">
          <ConfirmationModal isOpen={_isConfirmationModalOpen} onClose={closeConfirmationModal} confirmText="Save all changes" cancelText="Drop all changes"/>
          <Grid />
          <div className="ButtonArea">
            <Button onClick={toggleConfigMode} text={`Config mode is: ${_configEnabled}`} />
            <Button onClick={switchTheme} text={`Wisselen van theme`} />
            <Button onClick={openConfirmationModal} text={`Open confirmationModal`} />
            {_configEnabled && (
              <Button onClick={toggleGrid} text={`Grid is ${_gridEnabled}`} />
            )}
          </div>
          {/* <Button onclick={switchTheme} text={`Huidige theme: ${currentTheme}`} /> */}
          <DynamicRenderComponents theme={_currentTheme} config={_configData} configMode={_configEnabled} gridEnabled={_gridEnabled} />
        </div>
        {_configEnabled && <ConfiguratorBar />}
      </div>
    </div>
  );
};

export default App;

