import React from 'react'
import { Box, Typography } from '@mui/material'
import lang from '../lang'

const ErrorDisplay = () => {
    return (
        <Box textAlign="center" pt={4}>
            <Typography variant="h1" fontSize="24px" mb={4}>
                {lang.errorOccurredTitle}
            </Typography>
            <Typography>{lang.errorOccurredBody}</Typography>
        </Box>
    )
}

export default ErrorDisplay
