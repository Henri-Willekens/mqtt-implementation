import { PageConfig } from "../../../configuration/types";

export default interface HeaderProps {
  pages: PageConfig[],
  navigateToPage: (id: string) => any,
  activePageId: string
}