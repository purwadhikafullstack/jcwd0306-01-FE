import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import store from './states';
import './styles.scss';
import '@fontsource/open-sauce-one/300.css';
import '@fontsource/open-sauce-one/400.css';
import '@fontsource/open-sauce-one/500.css';
import '@fontsource/open-sauce-one/600.css';
import '@fontsource/open-sauce-one/700.css';
import '@fontsource/open-sauce-one/800.css';
import '@fontsource/open-sauce-one/900.css';
import '@fontsource/righteous';

const theme = createTheme({
  palette: {
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
  typography: { fontFamily: '"Open Sauce One", sans-serif' },
  shape: { borderRadius: 10 },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
