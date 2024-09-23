import { ComponentConfig } from "../../../configuration/types";

export default interface DynamicRenderComponentsProps {
  components: ComponentConfig[],
  connections: any[] | undefined,
  gridEnabled: boolean,
  activePageId: string
}