import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function HidiveThemeProvider({ children }) {
    return (
        <ThemeProvider
            theme={createTheme({
                palette: {
                    hidive: '#00AEF0',
                    white: 'rgba(167,172,178,1)',
                },
                typography: {
                    fontFamily: ['Roboto', 'sans-serif'],
                    fontSize: '14px',
                    h2: {
                        fontFamily: ['Libre Franklin', 'sans-serif'],
                        fontSize: '20px',
                    },
                },
                components: {
                    MuiRating: {
                        styleOverrides: {
                            icon: {
                                fontSize: '24px',
                            },
                            iconActive: ({ theme }) => ({
                                color: theme.palette.hidive,
                            }),
                            iconHover: ({ theme }) => ({
                                color: theme.palette.hidive,
                            }),
                            iconEmpty: ({ theme }) => ({
                                color: theme.palette.white,
                            }),
                            iconFilled: ({ theme }) => ({
                                color: theme.palette.hidive,
                            }),
                        },
                    },
                    Button: {
                        defaultProps: {
                            variant: 'contained',
                        },
                    },
                },
            })}
        >
            {children}
        </ThemeProvider>
    );
}
HidiveThemeProvider.propTypes = {
    children: PropTypes.any,
};
