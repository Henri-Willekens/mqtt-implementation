import { createContext } from 'react';

export const ThemeContext = createContext({
  _currentTheme: 'day',
  setCurrentTheme: (theme: string) => { }
});