import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { Stack, Box, Link, Typography } from '@mui/material'
import { SERVICES, SERVICE_NAMES } from '../../enums'

const ServiceImage = ({ service }) => {
    let img
    let alt = `Watch on ${SERVICE_NAMES[service]}`
    switch (service) {
        case SERVICES.AMAZON_PRIME:
            img = '../static/images/amazon_prime_icon.png'
            break
        case SERVICES.CRUNCHYROLL:
            img = '../static/images/crunchyroll_icon.png'
            break
        case SERVICES.FUNIMATION:
            img = '../static/images/funimation_icon.png'
            break
        case SERVICES.HIDIVE:
            img = '../static/images/hidive_icon.png'
            break
        case SERVICES.HULU:
            img = '../static/images/hulu_icon.png'
            break
        case SERVICES.NETFLIX:
            img = '../static/images/netflix_icon.png'
            break
        case SERVICES.TUBITV:
            img = '../static/images/tubitv_icon.png'
            break
        case SERVICES.VRV:
            img = '../static/images/vrv_icon.png'
            break
        case SERVICES.DISNEY_PLUS:
            img = '../static/images/disneyplus_icon.png'
            break
        default:
            return null
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
    )
}

const StreamingLink = ({ service, link }) => {
    const id = `streamingLink-${service}`
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
    )
}

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
    )
}

ServiceImage.propTypes = {
    service: PropTypes.oneOf(Object.values(SERVICES)).isRequired,
}
StreamingLink.propTypes = {
    service: PropTypes.oneOf(Object.values(SERVICES)).isRequired,
    link: PropTypes.string.isRequired,
}
StreamingLinks.propTypes = {
    links: PropTypes.object.isRequired,
}
export default StreamingLinks
