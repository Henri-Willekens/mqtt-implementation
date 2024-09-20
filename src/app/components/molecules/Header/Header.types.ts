import { PagesConfig } from "../../../configuration/types";

export default interface HeaderProps {
  pages: PagesConfig[],
  navigateToPage: (id: string) => any,
  activePageId: string,
  configEnabled: boolean
}