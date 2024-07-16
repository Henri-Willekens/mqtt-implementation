import "./ConfiguratorBar.scss"
import ConfiguratorBarProps from "./ConfiguratorBar.types";

const ConfiguratorBar: React.FC<ConfiguratorBarProps> = () => {
  return(
    <div className="configurator-bar">
      <div className="configurator-bar__background">
        <div className="configurator-bar__action-buttons">
          <div className="configurator-bar__action configurator-bar__action__new-page">New page</div>
          <div className="configurator-bar__action configurator-bar__action__save">Save</div>
          <div className="configurator-bar__action configurator-bar__action__library">Library</div>
        </div>
        <div>
          <p className="configurator-bar__mode-active">Currently in configuration mode</p>
        </div>
      </div>
    </div>
  )
};

export default ConfiguratorBar;