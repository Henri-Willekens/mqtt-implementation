import { PagesConfig } from "../../../configuration/types";

export default interface HeaderProps {
  pages: PagesConfig[],
  navigateToPage: any,
  pageName: string,
  activePageId: string
}