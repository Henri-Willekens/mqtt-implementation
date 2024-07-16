import DynamicRenderComponentsProps from "./DynamicRenderComponents.types";

import componentMap from "../../index";
import { ComponentConfig } from "../../../configuration/types";

const DynamicRenderComponents: React.FC<DynamicRenderComponentsProps> = ({ config, theme }) => {
  return (
    <>
      {config.components.map((componentConfig: ComponentConfig, index: number) => {
        const { type, props } = componentConfig;
        const Component = componentMap[type];
        const componentProps = { theme, ...props }

        return <Component key={index} {...componentProps} />
      })}
    </>
  );
};

export default DynamicRenderComponents;