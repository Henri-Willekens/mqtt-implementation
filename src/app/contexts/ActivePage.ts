import { createContext } from 'react';

export const ActivePageContext = createContext({
  _activePage: '',
  setActivePage: (activePage: string) => { }
});