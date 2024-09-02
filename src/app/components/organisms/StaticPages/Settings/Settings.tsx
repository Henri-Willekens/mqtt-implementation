import { useState, useContext } from "react";
import Button from "../../../atoms/Button/Button";

import { ConfigContext } from "../../../../contexts/Config";
import { ThemeContext } from "../../../../contexts/Theme";

import './Settings.scss';

const SettingsPage = () => {

  const { _currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [_gridEnabled, setGridEnabled] = useState(true);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigContext);

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

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <div className="Buttons">
        <div className="Themes">
          <label>Themes:</label>
          <Button extraClassName={`Btn ${_currentTheme == "night" && "active"} `} onClick={() => switchTheme("night")} text="Night" />
          <Button extraClassName={`Btn ${_currentTheme == "day" && "active"} `} onClick={() => switchTheme("day")} text="Day" />
        </div>
        <div className="Config">
          <label>Config:</label>
          <Button extraClassName={`Btn ${_configEnabled && "active"} `} onClick={toggleConfigMode} text="Config" />
        </div>
        <div className="Grid">
          <label>Grid:</label>
          <Button extraClassName="Btn" onClick={toggleGrid} text="Grid" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;