import { useEffect, useState } from "react";

import { ConfigContext } from "./contexts/Config";
import { ThemeContext } from "./contexts/Theme";
import { ActivePageContext } from "./contexts/ActivePage";

import Header from "./components/molecules/Header/Header";
import PageManager from "./components/organisms/PageManager/PageManager";
import ConfiguratorBar from "./components/molecules/ConfiguratorBar/ConfiguratorBar";

import config from "./configuration/config.json";
import { Config } from './configuration/types';

import "./App.scss";

const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState("day");
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_activePageId, setActivePageId] = useState("Nav1");

  const navigateToPage = (pageId: string) => {
    setActivePageId(pageId);
  };

  useEffect(() => {
    if (config.pages.length !== 0) {
      setConfigData(config as Config);
    } else {
      // fetch the config from mqtt or somewhere else
    }
  }, []);

  return (
    <div className="app">
      <ThemeContext.Provider value={{ _currentTheme, setCurrentTheme }}>
        <div className={`filter filter__${_currentTheme}`}>
          <ConfigContext.Provider value={{ _configEnabled, setConfigEnabled }}>
            <div className={_configEnabled ? "main main-config-mode" : "main"}>
              {_configData === null ? (
                <div className="loading">
                  <div className="loader"></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <Header pages={config.pages} navigateToPage={navigateToPage} activePageId={_activePageId} />
                  <div className="components">
                    {/* <ActivePageContext.Provider value={{ _activePageId, setActivePageId }} /> */}
                    <PageManager config={_configData} activePageId={_activePageId} />
                  </div>
                  {_configEnabled && <ConfiguratorBar />}
                </>
              )}
            </div>
          </ConfigContext.Provider>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;

