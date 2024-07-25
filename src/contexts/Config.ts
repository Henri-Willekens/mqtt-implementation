import { createContext } from "react";

//const configcontext should not only get the bolean but also get a function
//that sets the boolean
//this is why we use the useState hook

export const ConfigContext = createContext({
    _configEnabled: false,
    setConfigEnabled: (configEnabled: boolean) => { }
});
// export const ConfigContext = createContext(false);