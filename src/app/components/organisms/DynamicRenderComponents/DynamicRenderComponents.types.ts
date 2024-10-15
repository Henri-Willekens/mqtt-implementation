import { ComponentConfig, ConnectionConfig } from '../../../configuration/types';

export default interface DynamicRenderComponentsProps {
  components: ComponentConfig[],
  connections?: ConnectionConfig[] | undefined,
  gridEnabled: boolean
}