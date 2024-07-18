import { ComponentConfig } from "../../../configuration/types";

export default interface PageProps {
  key: number,
  pageId: number,
  title: string,
  components: ComponentConfig[]
};