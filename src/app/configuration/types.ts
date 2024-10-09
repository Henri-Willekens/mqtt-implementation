export interface PageConfig {
  gridEnabled: boolean,
  title: string,
  id: string,
  components: ComponentConfig[],
  connections?: ConnectionConfig[]
}

export interface ComponentConfig {
  type: string;
  props: { [key: string]: any };
}

export interface ConnectionConfig {
  type: string,
  from: string,
  to: string,
  content: string
}

export interface Config {
  pages: PageConfig[];
}