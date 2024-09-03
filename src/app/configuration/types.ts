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
  type: 'Pipe' | 'Connection',
  from: string,
  to: string,
  filled: boolean
}

export interface Config {
  pages: PageConfig[];
}