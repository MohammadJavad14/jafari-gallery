import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import IranYekan from './fonts/iranyekanwebregular.woff';

const iranyekan = {
  fontFamily: 'IranYekan',
  src: `url(${IranYekan}) format('woff')`,
};

const theme = createTheme({
  typography: {
    fontFamily: 'IranYekan',
  },
  palette: {
    primary: {
      main: '#000',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [iranyekan],
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/product/:id" component={ProductScreen} exact />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
