// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from './ThemeProvider';
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);
