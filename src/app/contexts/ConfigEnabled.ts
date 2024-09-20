import { createContext } from 'react';

export const ConfigEnabledContext = createContext({
  _configEnabled: false,
  setConfigEnabled: (configEnabled: boolean) => { }
});