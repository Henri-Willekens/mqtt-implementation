import { useState, useContext } from "react";
import Button from "../../../atoms/Button/Button";

import { ConfigEnabledContext } from "../../../../contexts/ConfigEnabled";
import { ThemeContext } from "../../../../contexts/Theme";

import './AlertLog.scss';

const SettingsPage = () => {

  const { _currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [_gridEnabled, setGridEnabled] = useState(true);
  const { _configEnabled, setConfigEnabled } = useContext(ConfigEnabledContext);

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
      <h2>Alert Log</h2>
    </div>
  );
};

export default SettingsPage;