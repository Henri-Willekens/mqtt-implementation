import { createContext } from 'react';

export const ActivePageIdContext = createContext({
    _activePageId: 'Settings',
    setActivePageId: (_activePageId: string) => { }
});