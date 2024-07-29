import { ComponentConfig } from "../../../configuration/types";

export default interface PageProps {
  key: string,
  pageId: string,
  title: string,
  components: ComponentConfig[],
  activePageId: string
};