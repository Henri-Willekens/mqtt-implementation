import { Config, PagesConfig } from '../../../configuration/types';

export default interface HeaderProps {
  configData: Config,
  pages: PagesConfig[],
  navigateToPage: (id: string) => any,
  activePageId: string
}