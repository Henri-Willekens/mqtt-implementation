import { useState, useContext } from "react";
import Button from "../../../atoms/Button/Button";

import { ConfigEnabledContext } from "../../../../contexts/ConfigEnabled";
import { ConfigFileContext } from "../../../../contexts/ConfigFile";
import { ThemeContext } from "../../../../contexts/Theme";

import './Settings.scss';

const SettingsPage = () => {

  const { _currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [_gridEnabled, setGridEnabled] = useState(true);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigEnabledContext);
  const { _activeConfig, setActiveConfig } = useContext(ConfigFileContext);

  const switchTheme = (theme: string) => {
    switch (theme) {
      case "night":
        setCurrentTheme("night");
        break;
      case "day":
        setCurrentTheme("day");
        break;
      default:
        break;
    }
  };

  const toggleGrid = () => {
    setGridEnabled(!_gridEnabled);
  };

  const toggleConfigMode = () => {
    setConfigEnabled(!_configEnabled);
  };

  const ChangeConfig = (ActiveConfig: string) => {
    switch (ActiveConfig) {
      case "ConfigA":
        setActiveConfig("ConfigA");
        break;
      case "ConfigB":
        setActiveConfig("ConfigB");
        break;
      default:
        break;
    }
  };

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <div className="Buttons">
        <div className="Themes">
          <label>Themes:</label>
          <Button extraClasses={`Btn ${_currentTheme == "day" && "active"} `} onClick={() => switchTheme("day")} value="Day" />
          <Button extraClasses={`Btn ${_currentTheme == "night" && "active"} `} onClick={() => switchTheme("night")} value="Night" />
        </div>
        <div className="Config">
          <label>Config:</label>
          <Button extraClasses={`Btn ${_configEnabled && "active"} `} onClick={toggleConfigMode} value="Config" />
        </div>
        <div className="Grid">
          <label>Grid:</label>
          <Button extraClasses="Btn" onClick={toggleGrid} value="Grid" />
        </div>
        <div className="ActiveConfig">
          <label>Active user:</label>
          <Button extraClasses={`Btn ${_activeConfig == "ConfigA" && "active"} `} onClick={() => ChangeConfig("ConfigA")} value="Config A" />
          <Button extraClasses={`Btn ${_activeConfig == "ConfigB" && "active"} `} onClick={() => ChangeConfig("ConfigB")} value="Config B" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;