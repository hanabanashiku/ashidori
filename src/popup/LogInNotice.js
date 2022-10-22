import React from 'react'
import { css } from '@emotion/react'
import { openOptions } from '../helpers/extensionHelpers'
import { Box, Typography, Button } from '@mui/material'
import lang from 'lang'

const LogInNotice = () => {
    return (
        <Box
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 4px 32px;
                gap: 8px;
            `}
        >
            <Typography textAlign="center" variant="h1" fontSize="18px">
                {lang.logInToContinue}
            </Typography>
            <Typography textAlign="center" fontSize="12px">
                {lang.logInBody}
            </Typography>
            <Button
                onClick={() => openOptions(window)}
                css={css`
                    position: absolute;
                    bottom: 16px;
                `}
            >
                {lang.logInButton}
            </Button>
        </Box>
    )
}

export default LogInNotice
