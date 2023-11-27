import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material';
import { node } from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import ModeContext from './contexts/ModeContext';
import useIsPathName from './hooks/useIsPathName';

function ThemeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
  const isAdminPage = useIsPathName('admin');

  useEffect(() => {
    if (mode === 'dark') localStorage.setItem('mode', 'dark');
    else localStorage.setItem('mode', 'light');
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const modeContextValue = useMemo(() => ({ mode, toggleMode }), [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        typography: { fontFamily: '"Open Sauce One", sans-serif' },
        shape: { borderRadius: 10 },
        palette:
          mode === 'dark'
            ? {
                mode: 'dark',
                primary: {
                  main: '#009BD2',
                  light: '#BEE0ED',
                  dark: '#006FAD',
                  contrastText: '#FFF',
                },
                text: {
                  main: 'rgba(255, 255, 255, 0.87)',
                  light: 'rgba(255, 255, 255, 0.6)',
                  dark: 'rgba(255, 255, 255, 1)',
                  contrastText: '#000',
                },
              }
            : {
                mode: 'light',
                primary: {
                  main: '#009BD2',
                  light: '#BEE0ED',
                  dark: '#006FAD',
                  contrastText: '#FFF',
                },
                text: {
                  main: 'rgba(0, 0, 0, 0.87)',
                  light: 'rgba(0, 0, 0, 0.6)',
                  dark: 'rgba(0, 0, 0, 1)',
                  contrastText: '#FFF',
                },
              },
      }),
    [mode]
  );

  useEffect(() => {
    if (isAdminPage && mode !== 'dark')
      document.body.style.backgroundColor = theme.palette.action.selected;
    else document.body.style.backgroundColor = theme.palette.background.paper;
  }, [theme, isAdminPage]);

  return (
    <ModeContext.Provider value={modeContextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ModeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: node.isRequired,
};

export default ThemeProvider;
