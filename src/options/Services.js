import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import _ from "lodash";
import Settings from "./Settings";
import { SERVICES } from "../enums";

const Services = () => {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    Settings.getEnabledServices().then((providers) => setSelection(providers));
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
    <label
      css={css`
        display: block;
        width: 15rem;
        font-size: 18px;
        padding-bottom: 4px;
      `}
    >
      <input
        type="checkbox"
        name={`service-${name}`}
        value={value}
        checked={selection.includes(value)}
        onChange={(e) => onChange(value, e.target.checked)}
        css={css`
          position: relative;
          vertical-align: middle;
          margin-top: -28px;
          margin-right: 8px;
        `}
      />
      <img src={image} alt={name} height="48px" />
    </label>
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
    <div
      css={css`
        position: relative;
        width: 25rem;
      `}
    >
      <h2>Enable integrations on</h2>
      <div>
        <ServiceCheckbox
          name="Crunchyroll"
          image="../static/images/crunchyroll.png"
          value={SERVICES.CRUNCHYROLL}
        />
        <ServiceCheckbox
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
          name="Netfix"
          image="../static/images/netflix.png"
          value={SERVICES.NETFLIX}
        />
        <ServiceCheckbox
          name="Amazon Prime"
          image="../static/images/amazon_prime.png"
          value={SERVICES.AMAZON_PRIME}
        />
        <ServiceCheckbox
          name="Hidive"
          image="../static/images/hidive.png"
          value={SERVICES.HIDIVE}
        />
      </div>
      <div
        css={css`
          position: absolute;
          right: 0;
          top: 0;
          & > button:not(:last-child) {
            margin-right: 8px;
          }
        `}
      >
        <button onClick={() => setAll(true)}>Enable all</button>
        <button onClick={() => setAll(false)}>Disable all</button>
      </div>
    </div>
  );
};

export default Services;
