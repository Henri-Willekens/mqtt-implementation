export interface PageConfig {
  gridEnabled: boolean,
  title: string,
  id: string,
  components: ComponentConfig[],
  connections: any[]
}

export interface ComponentConfig {
  type: string;
  props: { [key: string]: any };
}

export interface Config {
  pages: PageConfig[];
}