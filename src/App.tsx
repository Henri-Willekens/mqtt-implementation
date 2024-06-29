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