import { useEffect, useState } from "react";

import "./App.scss";
import Header from "./components/molecules/Header/Header";
import DynamicRenderComponents from "./components/organisms/DynamicRenderComponents/DynamicRenderComponents";

import config from "./configuration/test-config.json";
import { Config } from './configuration/types';


const App = () => {
  const [configData, setConfigData] = useState<Config | null>(null);

  useEffect(() => {
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
          <DynamicRenderComponents config={configData} />
        </div>
      </div>
    </div>
  );
};

export default App;