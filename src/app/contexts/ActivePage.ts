import { createContext } from 'react';

export const ActivePageContext = createContext({
    _activePageId: '',
    setActivePageId: (_activePageId: string) => { }
});