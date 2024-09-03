import { ComponentConfig } from "../../../configuration/types";

export default interface DynamicRenderComponentsProps {
  components: ComponentConfig[],
  connections: any[],
  gridEnabled: boolean,
  activePageId: string
}