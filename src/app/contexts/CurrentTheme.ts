import { createContext } from 'react';

export const CurrentThemeContext = createContext({
  _currentTheme: 'day',
  setCurrentTheme: (_theme: string) => { }
});