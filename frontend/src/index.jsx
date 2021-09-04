/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import './index.css';
import store from './store';
import App from './App';
import theme from './styles/theme';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StylesProvider jss={jss}>
      <Provider store={store}>
        <App />
      </Provider>
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
