import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Stack, Box, Link, Typography } from '@mui/material';
import { SERVICES, SERVICE_NAMES } from '../../enums';

const ServiceImage = ({ service }) => {
    let img;
    let alt = `Watch on ${SERVICE_NAMES[service]}`;

    const baseFolder = document.location.href.includes('detail')
        ? '../../static/images'
        : '../static/images';

    switch (service) {
        case SERVICES.AMAZON_PRIME:
            img = `${baseFolder}/amazon_prime_icon.png`;
            break;
        case SERVICES.CRUNCHYROLL:
            img = `${baseFolder}/crunchyroll_icon.png`;
            break;
        case SERVICES.FUNIMATION:
            img = `${baseFolder}/funimation_icon.png`;
            break;
        case SERVICES.HIDIVE:
            img = `${baseFolder}/hidive_icon.png`;
            break;
        case SERVICES.HULU:
            img = `${baseFolder}/hulu_icon.png`;
            break;
        case SERVICES.NETFLIX:
            img = `${baseFolder}/netflix_icon.png`;
            break;
        case SERVICES.TUBITV:
            img = `${baseFolder}/tubitv_icon.png`;
            break;
        case SERVICES.VRV:
            img = `${baseFolder}/vrv_icon.png`;
            break;
        case SERVICES.DISNEY_PLUS:
            img = `${baseFolder}/disneyplus_icon.png`;
            break;
        default:
            return null;
    }

    return (
        <img
            src={img}
            css={css`
                display: block;
                width: 32px;
                margin: 0 auto;
            `}
            alt={alt}
        />
    );
};

const StreamingLink = ({ service, link }) => {
    const id = `streamingLink-${service}`;
    return (
        <Box>
            <Link
                href={link}
                target="_blank"
                css={css`
                    text-decoration: none;
                `}
                aria-labelledby={id}
            >
                <ServiceImage service={service} />
                <Typography textAlign="center" fontSize="14px" id={id}>
                    {SERVICE_NAMES[service]}
                </Typography>
            </Link>
        </Box>
    );
};

const StreamingLinks = ({ links }) => {
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            {Object.keys(links).map((service, i) => (
                <StreamingLink
                    service={parseInt(service)}
                    link={links[service]}
                    key={i}
                />
            ))}
        </Stack>
    );
};

ServiceImage.propTypes = {
    service: PropTypes.oneOf(Object.values(SERVICES)).isRequired,
};
StreamingLink.propTypes = {
    service: PropTypes.oneOf(Object.values(SERVICES)).isRequired,
    link: PropTypes.string.isRequired,
};
StreamingLinks.propTypes = {
    links: PropTypes.object.isRequired,
};
export default StreamingLinks;
