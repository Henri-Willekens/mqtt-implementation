export interface ComponentConfig {
  type: string;
  props: { [key: string]: any };
}

export interface Config {
  components: ComponentConfig[];
}