import { ComponentConfig } from "../../../configuration/types";

export default interface DynamicRenderComponentsProps {
  config: ComponentConfig[],
  gridEnabled: boolean,
  activePageId: string
}