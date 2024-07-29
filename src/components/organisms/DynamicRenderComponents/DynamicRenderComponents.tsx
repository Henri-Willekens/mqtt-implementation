import DynamicRenderComponentsProps from "./DynamicRenderComponents.types";

import componentMap from "../../index";
import { ComponentConfig } from "../../../configuration/types";
import Draggable from "../../atoms/Draggable/Draggable";

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config, gridEnabled }) => {
  return (
    <>
      {config.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { ...props }

        return (
          <Draggable key={props.id} id={props.id} gridEnabled={gridEnabled}>
            <Component key={index} {...componentProps} />
          </Draggable>

        )
      })}
    </>
  );
};

export default DynamicRenderComponents;