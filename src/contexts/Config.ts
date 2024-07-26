import { createContext } from "react";

export const ConfigContext = createContext({
    _configEnabled: false,
    setConfigEnabled: (configEnabled: boolean) => { }
});