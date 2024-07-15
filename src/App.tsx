// import { useEffect, useState } from "react";

import "./App.scss";
// import Header from "./components/molecules/Header/Header";
// import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
// import Button from "./components/atoms/Button/Button";

// import config from "./configuration/config.json";
// import { Config } from './configuration/types';
// import Ball from "./components/atoms/Bal/Bal";


// const App = () => {
//   const [configData, setConfigData] = useState<Config | null>(null);
//   const [currentTheme, setCurrentTheme] = useState<string>('day');

//   const switchTheme = () => {
//     if (currentTheme == "day") {
//       setCurrentTheme("night");
//     } else {
//       setCurrentTheme("day")
//     }
//   }

//   useEffect(() => {
//     setConfigData(config as Config);
//   }, []);

//   if (!configData) {
//     return <div>Loading...</div>
//   }

//   return(
//     <div className={`compass__${currentTheme}`}>
//       <div className="main">
//         <Header pages={['page1', 'page2']} />
//         <div className="components">
//           <Ball offsetX={43} offsetY={2}/>
//           <Ball offsetX={43} offsetY={2}/>
//           {/* <Button onclick={switchTheme} text={`Huidige theme: ${currentTheme}`} />
//           <DynamicRenderComponents theme={currentTheme} config={configData} /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { Grid } from './components/atoms/testfile/Grid';
import Draggable from './components/atoms/testfile/Draggable';

const App = () => {
  return (
    <div>
      <Grid />
      <Draggable />
      <Draggable />
    </div>
  );
};

export default App;

