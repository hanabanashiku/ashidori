import { createTheme } from '@mui/material/styles';
import commonStyles from './common';

export default () =>
    createTheme({
        palette: {
            mode: 'dark',
            crunchyroll: '#f47521',
            button: '#dadada',
        },
        ...commonStyles,
    });
