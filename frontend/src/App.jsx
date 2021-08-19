import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import IranYekan from './fonts/iranyekanwebregular.woff';
import FooterMobile from './components/UI/FooterMobile';

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
    </BrowserRouter>
    <FooterMobile />
  </ThemeProvider>
);

export default App;
