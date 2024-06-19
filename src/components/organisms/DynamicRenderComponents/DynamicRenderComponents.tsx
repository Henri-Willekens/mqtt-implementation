import DynamicRenderComponentsProps from "./DynamicRenderComponents.types";

import componentMap from "../../index";
import { ComponentConfig } from "../../../configuration/types";

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config }) => {
  return(
    <>
      {config.components.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { ...props }

        return <Component key={index} {...componentProps} />
      })}
    </>
  );
};

export default DynamicRenderComponents;