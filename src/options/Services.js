import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import {
    Box,
    Typography,
    InputLabel,
    Switch,
    Button,
    ButtonGroup,
} from '@mui/material';
import _ from 'lodash';
import Settings from './Settings';
import { SERVICES } from '../enums';
import lang from 'lang';

const Services = () => {
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        Settings.getEnabledServices().then((providers) =>
            setSelection(providers)
        );
    }, []);

    const onChange = async (value, checked) => {
        const newArray = checked
            ? _.concat(selection, value)
            : _.without(selection, value);
        setSelection(newArray);
        return Settings.setEnabledServices(newArray);
    };

    const setAll = async (enabled) => {
        const newArray = enabled ? Object.values(SERVICES) : [];
        setSelection(newArray);
        return Settings.setEnabledServices(newArray);
    };

    const ServiceCheckbox = ({ name, image, value }) => (
        <InputLabel
            css={css`
                display: block;
                width: 15rem;
                font-size: 18px;
                padding-bottom: 4px;
            `}
        >
            <Switch
                value={value}
                checked={selection.includes(value)}
                onChange={(e) => onChange(value, e.target.checked)}
                inputProps={{
                    name: `service-${name}`,
                }}
                css={css`
                    position: relative;
                    vertical-align: middle;
                    margin-top: -28px;
                    margin-right: 8px;
                `}
            />
            <img src={image} alt={name} title={name} height="48px" />
        </InputLabel>
    );
    ServiceCheckbox.propTypes = {
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    };

    if (selection === null) {
        return null;
    }

    return (
        <Box
            css={css`
                position: relative;
                width: 30rem;
            `}
        >
            <Typography
                vaariant="h2"
                fontSize="15px"
                overflow="wrap"
                maxWidth="60%"
            >
                {lang.enableIntegrations}
            </Typography>
            <Box
                css={css`
                    column-count: 2;
                `}
            >
                <Box>
                    <ServiceCheckbox
                        name="Crunchyroll"
                        image="../static/images/crunchyroll.png"
                        value={SERVICES.CRUNCHYROLL}
                    />
                    <ServiceCheckbox
                        name="Hidive"
                        image="../static/images/hidive.png"
                        value={SERVICES.HIDIVE}
                    />
                    <ServiceCheckbox
                        name="Netflix"
                        image="../static/images/netflix.png"
                        value={SERVICES.NETFLIX}
                    />
                    {/*<ServiceCheckbox
            name="Funimation"
            image="../static/images/funimation.png"
            value={SERVICES.FUNIMATION}
          />
          <ServiceCheckbox
            name="Hulu"
            image="../static/images/hulu.png"
            value={SERVICES.HULU}
          />
          <ServiceCheckbox
            name="Amazon Prime"
            image="../static/images/amazon_prime.png"
            value={SERVICES.AMAZON_PRIME}
          />
          */}
                </Box>
            </Box>

            <ButtonGroup
                size="small"
                css={css`
                    position: absolute;
                    right: 4rem;
                    top: 0;
                `}
            >
                <Button onClick={() => setAll(true)}>{lang.enableAll}</Button>
                <Button onClick={() => setAll(false)}>{lang.disableAll}</Button>
            </ButtonGroup>
        </Box>
    );
};

export default Services;
