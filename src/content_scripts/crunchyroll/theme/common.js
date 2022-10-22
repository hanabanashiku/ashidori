export default {
    typography: {
        fontFamily: ['Lato', 'Helvetica Neue', 'helvetica', 'sans-serif'],
        h3: {
            marginBottom: '0.5rem',
            fontWeight: 600,
            fontSize: '1.375rem',
        },
        subtitle: {
            fontSize: '.875rem',
            fontWeight: 500,
            color: '#a0a0a0',
        },
        highlight: {
            fontWeight: 600,
            color: '#f47521',
            display: 'inline',
        },
    },
    components: {
        MuiRating: {
            styleOverrides: {
                iconActive: ({ theme }) => ({
                    color: theme.palette.crunchyroll,
                }),
                iconHover: ({ theme }) => ({
                    color: theme.palette.crunchyroll,
                }),
            },
        },
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    height: '40px',
                    border: `2px solid ${theme.palette.button}`,
                    borderRadius: 0,
                    color: theme.palette.button,
                    fontSize: '0.875rem',
                    lineHeight: '1.125rem',
                    fontWeight: 900,
                    '&:hover': {
                        borderColor: theme.palette.text.primary,
                        color: theme.palette.text.primary,
                    },
                }),
            },
        },
    },
}
