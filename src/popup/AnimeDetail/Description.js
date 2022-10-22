import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Link } from '@mui/material';
import { css } from '@emotion/react';
import lang from 'lang';

const Description = ({ children }) => {
    const [expanded, setExpanded] = useState(false);
    const allVisible = children.length < 175;

    function style() {
        if (expanded || allVisible) {
            return css`
                display: block;
                padding-top: 4px;
                line-height: 1;
                font-size: 12px;
            `;
        }

        return css`
            display: -webkit-box;
            padding-top: 4px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-height: 1;
            font-size: 12px;
            overflow: hidden;
        `;
    }

    return (
        <>
            <Typography paragraph css={style()} data-testid="detail-synopsis">
                {children}
            </Typography>
            {!allVisible && (
                <Link
                    onClick={() => setExpanded(!expanded)}
                    css={css`
                        display: block;
                        margin-top: -12px;
                        text-align: right;
                        text-decoration: none;
                        cursor: pointer;
                    `}
                    aria-expanded={expanded}
                    aria-controls="detail-synopsis"
                >
                    {expanded ? lang.seeLess : lang.seeMore}
                </Link>
            )}
        </>
    );
};
Description.propTypes = {
    children: PropTypes.string.isRequired,
};

export default Description;
