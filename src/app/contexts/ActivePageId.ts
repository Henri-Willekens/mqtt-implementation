import { createContext } from 'react';

export const ActivePageIdContext = createContext({
    _activePageId: '',
    setActivePageId: (_activePageId: string) => { }
});