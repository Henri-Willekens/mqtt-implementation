import { PageConfig } from "../../../configuration/types";

export default interface PageProps {
  key: string,
  pageId: string,
  title: string,
  config: PageConfig,
  activePageId: string,
  gridEnabled: boolean
};