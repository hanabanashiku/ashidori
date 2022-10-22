import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import {
    Container,
    Box,
    Paper,
    Grid,
    Stack,
    Typography,
    Link,
} from '@mui/material';
import {
    BugReport as BugReportIcon,
    Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import useDarkMode from '../helpers/useDarkMode';

const Layout = ({ children }) => {
    const isDarkMode = useDarkMode();
    return (
        <Container
            css={css`
                width: 80rem;
                margin: 32px auto;
            `}
        >
            <Paper
                elevation={6}
                css={css`
                    display: block;
                    position: relative;
                    min-height: 650px;
                    height: calc(100vh - 64px);
                    overflow: auto;
                `}
            >
                <Box>
                    <Box
                        css={css`
                            height: 128px;
                            width: 512px;
                            margin: auto;
                            background: url('/static/images/${isDarkMode
                                    ? 'logo_dark'
                                    : 'logo'}.png')
                                no-repeat;
                        `}
                    />
                    <p
                        css={css`
                            font-size: 14px;
                            font-style: italic;
                            text-align: center;
                            line-height: 0.2;
                        `}
                    >
                        An anime tracker in your browser.
                    </p>
                    <hr />
                </Box>
                <Box padding="16px 36px">{children}</Box>
                <Grid
                    direction="row"
                    css={css`
          position: absolute;
          bottom: 0;
          width: 100%
          flex-grow: 1;
          padding: 8px 16px;
        `}
                    container
                >
                    <Grid item xs={5} />
                    <Grid item xs={4}>
                        <Typography
                            css={css`
                                height: 100%;
                                line-height: 2.5em;
                            `}
                        >
                            Made with ❤️ by{' '}
                            <Link
                                href="https://twitter.com/hanabanashiku"
                                color="text.primary"
                                target="_blank"
                                underline="hover"
                            >
                                hanabanashiku
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack lineHeight={0.5}>
                            <Link
                                href="https://github.com/hanabanashiku/ashidori/issues"
                                target="_blank"
                                underline="hover"
                            >
                                <BugReportIcon
                                    css={css`
                                        font-size: 19px;
                                        color: green;
                                    `}
                                />
                                ? Report here
                            </Link>
                            <Link
                                href="https://github.com/hanabanashiku/ashidori"
                                target="_blank"
                                underline="hover"
                            >
                                <LightbulbIcon
                                    css={css`
                                        font-size: 19px;
                                        color: yellow;
                                    `}
                                />
                                ? Contribute here
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};
Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;
