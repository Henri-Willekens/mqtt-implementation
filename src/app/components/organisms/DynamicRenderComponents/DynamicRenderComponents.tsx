import DynamicRenderComponentsProps from "./DynamicRenderComponents.types";

import componentMap from "../../index";
import { ComponentConfig } from "../../../configuration/types";
import Draggable from "../../atoms/Draggable/Draggable";

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config, gridEnabled, activePageId }) => {
  return (
    <>
      {config.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { ...props }

        return (
          <Draggable elementInsideId={props.id} key={props.id} id={props.id} gridEnabled={gridEnabled} activePageId={activePageId}>
            <Component key={index} activePageId={activePageId} {...componentProps} />
          </Draggable>

        )
      })}
    </>
  );
};

export default DynamicRenderComponents;