import { createTheme } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';
import blue from '@material-ui/core/colors/blue';

import IranYekanRegular from '../fonts/iranyekanwebregular.woff';

const iranYekan = {
    fontFamily: 'IranYekan',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
  local('IranYekan'),
  local('IranYekan-Regular'),
  url(${IranYekanRegular}) format('woff')
  `,
};

const theme = createTheme({
        direction: 'rtl',
        typography: {
            fontFamily: 'IranYekan , Arial',
        },

        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': [iranYekan],
                },
            },
            'Mui-Selected': {
                backgroundColor: blue[200],
            },
        },
        palette: {
            primary: {
                main: '#000',
            },
        },
    },
    faIR
);

export default theme;