import { useEffect, useState } from "react";

import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
import Button from "./components/atoms/Button/Button";
import { Grid } from './components/atoms/Grid/Grid';

import config from "./configuration/config.json";
import { Config } from './configuration/types';

import "./App.scss";

const App = () => {
  const [configData, setConfigData] = useState<Config | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('day');
  const [_gridEnabled, setGridEnabled] = useState(true);
  const [_configEnabled, setConfigEnabled] = useState(false);

  const switchTheme = () => {
    if (currentTheme == "day") {
      setCurrentTheme("night");
    } else {
      setCurrentTheme("day")
    }
  }
  const toggleGrid = () => {
    setConfigEnabled(!_gridEnabled);
  }
  const toggleConfigMode = () => {
    setGridEnabled(!_configEnabled);
  }

  useEffect(() => {
    console.log(config.components.length)
    if (config.components.length !== 0) {
      setConfigData(config as Config);
    } else {
      // fetch the config from mqtt or somewhere else
    }
  }, []);


  if (!configData) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  };

  
  return(
    <div className={`compass__${currentTheme}`}>
      <div className="main">
        <Header pages={['page1', 'page2']} />
        <div className="components">
          <Grid />
          <div className="ButtonArea">
            <Button onClick={toggleConfigMode} text={`Config mode is: ${_configEnabled}`} />
            {_configEnabled && (
              <Button onClick={toggleGrid} text={`Grid is ${_gridEnabled}`} />
            )}
          </div>
          {/* <Button onclick={switchTheme} text={`Huidige theme: ${currentTheme}`} /> */}
          <DynamicRenderComponents theme={currentTheme} config={configData} configMode={_configEnabled} gridEnabled={_gridEnabled} />
        </div>
      </div>
    </div>
  );
};

export default App;

