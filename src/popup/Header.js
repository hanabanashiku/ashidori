import React from 'react'
import { css } from '@emotion/react'
import { openOptions } from '../helpers/extensionHelpers'
import { Box, IconButton } from '@mui/material'
import { Settings } from '@mui/icons-material'
import useDarkMode from '../helpers/useDarkMode'
import lang from 'lang'

const Header = () => {
    const isDarkMode = useDarkMode()

    return (
        <Box
            css={css`
      display: flex;
      position: relative;
      border-bottom: 1px solid rgba(194, 224, 255, 0.08);
      height="50px";
      align-items: center;
      justify-content: center;
    `}
        >
            <img
                src={`../static/images/${
                    isDarkMode ? 'logo_dark' : 'logo'
                }.png`}
                css={css`
                    width: 180px;
                    height: 45px;
                    margin: 4px 0;
                `}
            />
            <IconButton
                css={css`
                    position: absolute;
                    right: 0;
                    padding-right: 8px;
                    color: ${isDarkMode ? '#007fff' : '#000'};
                `}
                onClick={() => openOptions(window)}
                aria-label={lang.settingsButton}
            >
                <Settings />
            </IconButton>
        </Box>
    )
}

export default Header
