export interface PagesConfig {
  title: string,
  id: number,
  components: ComponentConfig[]
}

export interface ComponentConfig {
  type: string;
  props: { [key: string]: any };
}

export interface Config {
  pages: PagesConfig[];
}