import DynamicRenderComponentsProps from "./DynamicRenderComponents.types";

import componentMap from "../../index";
import { ComponentConfig } from "../../../configuration/types";
import Draggable from "../../atoms/Draggable/Draggable";

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config, theme, configMode, gridEnabled }) => {
  return (
    <>
      {config.components.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { theme, ...props }

        return (
          <Draggable elementInsideId={props.id} configMode={configMode} gridEnabled={gridEnabled}>
            <Component key={index} configEnabled={configMode} {...componentProps} />
          </Draggable>

        )
      })}
    </>
  );
};

export default DynamicRenderComponents;