import "./ConfiguratorBar.scss"
import ConfiguratorBarProps from "./ConfiguratorBar.types";

const ConfiguratorBar: React.FC<ConfiguratorBarProps> = () => {
  return (
    <div className="configurator-bar">
      <div className="configurator-bar__background">
        <div className="configurator-bar__action-buttons">
          <div className="configurator-bar__action configurator-bar__action__library">
            <img src="./icons/config/local_library.svg" />
          </div>
        </div>
        <div>
          <p className="configurator-bar__mode-active">Currently in configuration mode</p>
        </div>
      </div>
    </div>
  )
};

export default ConfiguratorBar;