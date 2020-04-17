import React from 'react';
import App from './layout/app';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import * as serviceWorker from './serviceWorker';
import detectBrowserLanguage from 'detect-browser-language'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
    palette: {
        primary: {
            main: '#F8931D',
            contrastText: '#FFF',
        },
    },
});

const locale = detectBrowserLanguage();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <IntlProvider locale={locale}>
            <App />
        </IntlProvider>
    </MuiThemeProvider>
    ,
    document.getElementById('root'));

serviceWorker.unregister();
