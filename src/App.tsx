import { useEffect, useState } from "react";

import "./App.scss";
import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
import Button from "./components/atoms/Button/Button";

import config from "./configuration/config.json";
import { Config } from './configuration/types';


const App = () => {
  const [configData, setConfigData] = useState<Config | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('day');

  const switchTheme = () => {
   if (currentTheme == "day") {
    setCurrentTheme("night");
   } else {
    setCurrentTheme("day")
   }
  }

  useEffect(() => {
    // check if config data is locally set up or not
    setConfigData(config as Config);
  }, []);

  if (!configData) {
    return <div>Loading...</div>
  }

  return(
    <div className="app">
      <div className="main">
        <Header pages={['page1', 'page2']} />
        <div className="components">
          {/* <Button onclick={switchTheme} text={`Huidige theme: ${currentTheme}`} /> */}
          <DynamicRenderComponents theme={currentTheme} config={configData} />
        </div>
      </div>
    </div>
  );
};

export default App;