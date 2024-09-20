import ConfiguratorBarProps from "./ConfiguratorBar.types";
import "./ConfiguratorBar.scss"

import { useState } from "react";

import Button from "../../atoms/Button/Button";
import componentMap from "../..";

const ConfiguratorBar: React.FC<ConfiguratorBarProps> = () => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);

  const showLibrary = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  return (
    <div className={`configurator-bar ${isLibraryOpen ? 'library-open' : ''}`}>
      {isLibraryOpen && 
        <div className='configurator-bar__libary'>
        
        </div>
      }
      <div className='configurator-bar__action-buttons'>
        <Button onClick={showLibrary} value='Open library' />
      </div>
    </div>
  )
};

export default ConfiguratorBar;