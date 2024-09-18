import { useState, useContext } from "react";
import Button from "../../../atoms/Button/Button";

import { ConfigContext } from "../../../../contexts/Config";
import { ThemeContext } from "../../../../contexts/Theme";

import './PagesOverview.scss';

const PagesOverview = () => {

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
      <h2>All pages</h2>
    </div>
  );
};

export default PagesOverview;