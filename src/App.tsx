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
    setConfigData(config as Config);
  }, []);

  if (!configData) {
    return <div>Loading...</div>
  }

  return(
    <div className={`compass__${currentTheme}`}>
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

// import React from 'react';
// import { Grid } from './components/atoms/Grid/Grid';
// import Draggable from './components/atoms/Draggable/Draggable';
// import { useState } from 'react';


// const App = () => {
//   const [GridExists, setGridExists] = useState(true);
//   const [configMode, setConfigMode] = useState(false);

//   return (
//     <div className="screen">
//       <Grid />
//       <Draggable gridEnabled={GridExists} configMode={configMode}/>
//       <Draggable gridEnabled={GridExists} configMode={configMode}/>
//       <button onClick={() => setGridExists(!GridExists)}>Toggle grid</button>
//       <button onClick={() => setConfigMode(!configMode)}>Toggle config mode</button>
//     </div>
//   );
// };

// export default App;

