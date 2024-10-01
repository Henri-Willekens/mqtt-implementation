import { createContext } from 'react';

export const ConfigEnabledContext = createContext({
  _configEnabled: true,
  setConfigEnabled: (_configEnabled: boolean) => { }
});