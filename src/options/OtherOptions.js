import React, { useReducer, useEffect } from "react";
import { css } from "@emotion/react";
import {
  Box,
  Typography,
  FormGroup,
  InputLabel,
  Input,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import Settings from "./Settings";
import { NOTIFY_EPSIODE_ANSWERS } from "../enums";
import lang from "lang";

const reducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...action.payload,
      };

    case "setUpdatePopup":
      Settings.setShouldShowUpdatePopup(action.payload);
      return {
        ...state,
        shouldShowUpdatePopup: action.payload,
      };

    case "setEpisodeNotifications":
      Settings.setNotifiyForNewEpisodes(action.payload);
      return {
        ...state,
        shouldNotifiyForNewEpisodes: action.payload,
      };

    case "setUpdateDelay":
      Settings.setShouldUpdateAfterMinutes(action.payload);
      return {
        ...state,
        updateDelay: action.payload,
      };

    default:
      return state;
  }
};

const OtherOptions = () => {
  const [state, dispatch] = useReducer(reducer, null);

  // init state
  useEffect(() => {
    (async () => {
      // Get settings
      const shouldShowUpdatePopup = Settings.shouldShowUpdatePopup();
      const shouldNotifiyForNewEpisodes =
        Settings.shouldNotifiyForNewEpisodes();
      const updateDelay = Settings.shouldUpdateAfterMinutes();

      dispatch({
        type: "init",
        payload: {
          shouldShowUpdatePopup: await shouldShowUpdatePopup,
          shouldNotifiyForNewEpisodes: await shouldNotifiyForNewEpisodes,
          updateDelay: await updateDelay,
        },
      });
    })();
  }, [dispatch]);

  const toggleUpdatePopup = (value) => {
    dispatch({
      type: "setUpdatePopup",
      payload: value,
    });
  };

  const setEpisodeNotifications = (value) => {
    dispatch({
      type: "setEpisodeNotifications",
      payload: value,
    });
  };

  const setUpdateMinutes = (value) => {
    dispatch({
      type: "setUpdateDelay",
      payload: value,
    });
  };

  if (state === null) {
    return null;
  }

  return (
    <Box
      css={css`
        position: absolute;
        top: 32px;
        right: 0;
        font-size: 14px;
        & input {
          margin-right: 8px;
        }
        & > label {
          display: block;
          text-align: left;
          padding-bottom: 8px;
        }
      `}
    >
      <Typography variant="h2" fontSize="18px">
        {lang.options}
      </Typography>
      <InputLabel>
        Wait&nbsp;
        <Input
          type="number"
          variant="outlined"
          min="0"
          max="25"
          value={state.updateDelay}
          onChange={(e) => setUpdateMinutes(e.target.value)}
          sx={{ width: "3.5rem" }}
        />
        minutes before updating episode count.
      </InputLabel>
      <InputLabel
        css={css`
          margin-left: 16px;
        `}
      >
        <Checkbox
          name="should-show-update-poppup"
          checked={state.shouldShowUpdatePopup}
          onChange={(e) => toggleUpdatePopup(e.target.checked)}
          size="small"
        />
        {lang.askBeforeUpdating}
      </InputLabel>
      <FormGroup>
        <Typography>{lang.newEpisodeNotification}</Typography>
        <RadioGroup
          css={css`
            padding-left: 16px;
            & > label {
              padding-right: 12px;
            }
          `}
          row
        >
          <InputLabel>
            <Radio
              name="notify-for-new-epsiode"
              size="small"
              checked={
                state.shouldNotifiyForNewEpisodes ===
                NOTIFY_EPSIODE_ANSWERS.NEVER
              }
              onChange={() =>
                setEpisodeNotifications(NOTIFY_EPSIODE_ANSWERS.NEVER)
              }
            />
            {lang.never}
          </InputLabel>
          <InputLabel>
            <Radio
              name="notify-for-new-epsiode"
              size="small"
              checked={
                state.shouldNotifiyForNewEpisodes ===
                NOTIFY_EPSIODE_ANSWERS.ALWAYS
              }
              onChange={() =>
                setEpisodeNotifications(NOTIFY_EPSIODE_ANSWERS.ALWAYS)
              }
            />
            {lang.always}
          </InputLabel>
          <InputLabel>
            <Radio
              name="notify-for-new-epsiode"
              checked={
                state.shouldNotifiyForNewEpisodes ===
                NOTIFY_EPSIODE_ANSWERS.LATEST
              }
              onChange={() =>
                setEpisodeNotifications(NOTIFY_EPSIODE_ANSWERS.LATEST)
              }
            />
            {lang.latestEpisodeRadio}
          </InputLabel>
        </RadioGroup>
      </FormGroup>
    </Box>
  );
};

export default OtherOptions;
