import { useEffect, useState } from "react";

import "./App.scss";
import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";
import Button from "./components/atoms/Button/Button";

import config from "./configuration/config.json";
import { Config } from './configuration/types';
import ModalDialog from "./components/molecules/ModalDialog/ModalDialog";


const App = () => {
  const [configData, setConfigData] = useState<Config | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('day');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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
    <div className={`compass__${currentTheme}`}>
      <div className="main">
        <Header pages={['page1', 'page2']} />
        <div className="components">
          {/* <Button onClick={switchTheme} text={`Wisselen van theme`} />
          <DynamicRenderComponents theme={currentTheme} config={configData} /> */}
          <button onClick={openModal}>Open modal</button>
          <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
            <h1>Hi I am a modal.</h1>
          </ModalDialog>
        </div>
      </div>
    </div>
  );
};

export default App;