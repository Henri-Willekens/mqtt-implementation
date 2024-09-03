import { PageConfig } from "../../../configuration/types";

export default interface HeaderProps {
  pages: PageConfig[],
  navigateToPage: any,
  pageName: string,
  activePageId: string
}