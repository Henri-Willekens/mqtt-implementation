import { createContext } from "react";

export const ConfigFileContext = createContext({
    _activeConfig: "ConfigA",
    setActiveConfig: (_activeConfig: string) => { }
});