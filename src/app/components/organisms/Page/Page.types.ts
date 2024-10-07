import { ComponentConfig } from '../../../configuration/types';

export default interface PageProps {
  pageId: string,
  title: string,
  config: PageConfig,
  activePageId: string,
  gridEnabled: boolean
};