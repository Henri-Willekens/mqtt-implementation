import { useEffect, useState } from "react";

import { ConfigEnabledContext } from "./contexts/ConfigEnabled";
import { ThemeContext } from "./contexts/Theme";
import { ActivePageContext } from "./contexts/ActivePage";

import Header from "./components/molecules/Header/Header";
import PageManager from "./components/organisms/PageManager/PageManager";
import ConfiguratorBar from "./components/molecules/ConfiguratorBar/ConfiguratorBar";

import config from "./configuration/config.json";
import exampleconfig from "./configuration/example.config.json";
import { Config } from './configuration/types';

import "./App.scss";
import { ConfigFileContext } from "./contexts/ConfigFile";

const App = () => {
  const [_configData, setConfigData] = useState<Config | null>(null);
  const [_currentTheme, setCurrentTheme] = useState("day");
  const [_configEnabled, setConfigEnabled] = useState(false);
  const [_activePageId, setActivePageId] = useState("Nav1");
  const [_activeConfig, setActiveConfig] = useState("ConfigA");

  const navigateToPage = (pageId: string) => {
    setActivePageId(pageId);
  };

  useEffect(() => {
    if (config.pages.length !== 0) {
      _activeConfig == 'ConfigA' ? setConfigData(config as Config) : setConfigData(exampleconfig as Config);
    } else {
      // fetch the config from mqtt or somewhere else
    }
  }, [_activeConfig]);

  return (
    <div className="app">
      <ThemeContext.Provider value={{ _currentTheme, setCurrentTheme }}>
        <div className={`filter filter__${_currentTheme}`}>
          <ConfigEnabledContext.Provider value={{ _configEnabled, setConfigEnabled }}>
            <div className={_configEnabled ? "main main-config-mode" : "main"}>
              {_configData === null ? (
                <div className="loading">
                  <div className="loader"></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <Header configData={config} pages={config.pages} navigateToPage={navigateToPage} activePageId={_activePageId} />
                  <div className="components">
                    {/* <ActivePageContext.Provider value={{ _activePageId, setActivePageId }} /> */}
                    <ConfigFileContext.Provider value={{ _activeConfig, setActiveConfig }}>
                      <PageManager config={_configData} activePageId={_activePageId} />
                    </ConfigFileContext.Provider>
                  </div>
                  {_configEnabled && <ConfiguratorBar />}
                </>
              )}
            </div>
          </ConfigEnabledContext.Provider>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};

export default App;

