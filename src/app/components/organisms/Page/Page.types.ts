import { ComponentConfig, ConnectionConfig } from '../../../configuration/types';

export default interface PageProps {
  pageId: string,
  title: string,
  components: ComponentConfig[],
  connections: ConnectionConfig[] | undefined,
  gridEnabled: boolean
};