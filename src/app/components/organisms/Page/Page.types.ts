import { ComponentConfig } from '../../../configuration/types';

export default interface PageProps {
  pageId: string,
  title: string,
  components: ComponentConfig[],
  activePageId: string,
  gridEnabled: boolean
};