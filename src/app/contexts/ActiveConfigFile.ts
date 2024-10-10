import { createContext } from 'react';

export const ActiveConfigFileContext = createContext({
  _activeConfigFile: 'ConfigA',
  setActiveConfigFile: (_activeConfigFile: string) => { }
});