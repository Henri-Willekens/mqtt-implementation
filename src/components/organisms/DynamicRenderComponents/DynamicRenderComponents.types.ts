import { ComponentConfig } from "../../../configuration/types";

export default interface DynamicRenderComponentsProps {
  config: ComponentConfig[],
  theme: string,
  configMode: boolean,
  gridEnabled: boolean
}