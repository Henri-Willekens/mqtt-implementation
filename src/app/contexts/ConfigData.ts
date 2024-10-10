import { createContext } from 'react';

import { Config } from '../configuration/types';

export const ConfigDataContext = createContext<{ _configData: Config | null, setConfigData: (_configData: Config) => void }>({
  _configData: null,
  setConfigData: (_configData: Config) => {}
});