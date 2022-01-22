import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Stack, Box, Link, Typography } from "@mui/material";
import { SERVICES, SERVICE_NAMES } from "../../enums";

const ProviderImage = ({ provider }) => {
  let img;
  switch (provider) {
    case SERVICES.AMAZON_PRIME:
      img = "../static/images/amazon_prime.png";
      break;
    case SERVICES.CRUNCHYROLL:
      img = "../static/images/crunchyroll.png";
      break;
    case SERVICES.FUNIMATION:
      img = "../static/images/funimation.png";
      break;
    case SERVICES.HIDIVE:
      img = "../static/images/hidive.png";
      break;
    case SERVICES.HULU:
      img = "../static/images/hulu.png";
      break;
    case SERVICES.NETFLIX:
      img = "../static/images/netflix.png";
      break;
    case SERVICES.TUBITV:
      img = "../static/images/tubitv.png";
      break;
    default:
      return null;
  }

  return <img src={img} width="50px" />;
};

const StreamingLink = ({ provider, link }) => {
  return (
    <Box>
      <Link
        href={link}
        css={css`
          text-decoration: none;
        `}
      >
        <ProviderImage provider={provider} />
        <Typography textAlign="center" fontSize="14px">
          {SERVICE_NAMES[provider]}
        </Typography>
      </Link>
    </Box>
  );
};

const StreamingLinks = ({ links }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {Object.keys(links).map((provider, i) => (
        <StreamingLink
          provider={parseInt(provider)}
          link={links[provider]}
          key={i}
        />
      ))}
    </Stack>
  );
};

ProviderImage.propTypes = {
  provider: PropTypes.oneOf(Object.values(SERVICES)).isRequired,
};
StreamingLink.propTypes = {
  provider: PropTypes.oneOf(Object.values(SERVICES)).isRequired,
  link: PropTypes.string.isRequired,
};
StreamingLinks.propTypes = {
  links: PropTypes.object.isRequired,
};
export default StreamingLinks;
