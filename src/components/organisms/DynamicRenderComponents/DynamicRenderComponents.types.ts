import { Config } from "../../../configuration/types";

export default interface DynamicRenderComponentsProps {
  config: Config,
  theme: string,
  configMode: boolean,
  gridEnabled: boolean
}