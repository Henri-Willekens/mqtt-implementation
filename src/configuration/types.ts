export interface PagesConfig {
  title: string,
  id: string,
  components: ComponentConfig[]
}

export interface ComponentConfig {
  type: string;
  props: { [key: string]: any };
}

export interface Config {
  pages: PagesConfig[];
}