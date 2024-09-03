import DynamicRenderComponentsProps from "./DynamicRenderComponents.types";

import { useContext, useState } from "react";
import componentMap from "../../index";
import { ComponentConfig } from "../../../configuration/types";
import Draggable from "../../atoms/Draggable/Draggable";
import { ConfigContext } from "src/app/contexts/Config";
import OrthologalLine from "../../atoms/OrthogonalLine/OrthogonalLine";

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config, gridEnabled, activePageId }) => {

  const { _configEnabled } = useContext(ConfigContext);
  const [connections, setConnections] = useState([
    { from: { x: 50, y: 50}, to: { x: 550, y: 550 }, filled: true}
  ]);

  return (
    <>
      {config.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { ...props }

        return (
          <Draggable elementInsideId={props.id} key={props.id} id={props.id} gridEnabled={gridEnabled} activePageId={activePageId}>
            <Component key={index} activePageId={activePageId} configEnabled={_configEnabled} {...componentProps} />
          </Draggable>

        )
      })}
      {connections.map((conn, index) => {
        return(
          <OrthologalLine key={index} from={conn.from} to={conn.to} filled={conn.filled} />
        );
      })}
    </>
  );
};

export default DynamicRenderComponents;