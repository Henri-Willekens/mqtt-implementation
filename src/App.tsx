import { useEffect, useState } from "react";

import "./App.scss";
import { Grid } from './components/atoms/Grid/Grid';
import Draggable from './components/atoms/Draggable/Draggable';
import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
import Button from "./components/atoms/Button/Button";

import config from "./configuration/config.json";
import { Config } from './configuration/types';


const App = () => {
  const [configData, setConfigData] = useState<Config | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('day');
  const [GridExists, setGridExists] = useState(true);
  const [configMode, setConfigMode] = useState(false);

  const switchTheme = () => {
    if (currentTheme == "day") {
      setCurrentTheme("night");
    } else {
      setCurrentTheme("day")
    }
  }

  useEffect(() => {
    setConfigData(config as Config);
  }, []);

  if (!configData) {
    return <div>Loading...</div>
  }

  return (
    <div className={`compass__${currentTheme}`}>
      <div className="main">
        <Header pages={['page1', 'page2']} />
        <div className="components">
          <Grid />
          <button onClick={() => setGridExists(!GridExists)}>Toggle grid</button>
          <button onClick={() => setConfigMode(!configMode)}>Toggle config mode</button>
          {/* <Button onclick={switchTheme} text={`Huidige theme: ${currentTheme}`} /> */}
          <DynamicRenderComponents theme={currentTheme} config={configData} configMode={configMode} gridEnabled={GridExists} />
        </div>
      </div>
    </div>
  );
};

export default App;

