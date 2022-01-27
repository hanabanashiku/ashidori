import React, { useReducer, useEffect } from "react";
import { css } from "@emotion/react";
import Settings from "./Settings";
import { NOTIFY_EPSIODE_ANSWERS } from "../enums";

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
    <div
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
      <h2>Options</h2>
      <label>
        Wait&nbsp;
        <input
          type="number"
          min="0"
          max="25"
          value={state.updateDelay}
          onChange={(e) => setUpdateMinutes(e.target.value)}
          css={css`
            width: 3rem;
          `}
        />
        minutes before updating episode count.
      </label>
      <label
        css={css`
          margin-left: 16px;
        `}
      >
        <input
          type="checkbox"
          name="should-show-update-poppup"
          checked={state.shouldShowUpdatePopup}
          onChange={(e) => toggleUpdatePopup(e.target.checked)}
        />
        Ask before updating episode count
      </label>
      <div>
        <p>
          Send a notification when a new epsiode is released for a current
          series
        </p>
        <div
          css={css`
            padding-left: 16px;
            & > label {
              padding-right: 12px;
            }
          `}
        >
          <label>
            <input
              name="notify-for-new-epsiode"
              type="radio"
              checked={
                state.shouldNotifiyForNewEpisodes ===
                NOTIFY_EPSIODE_ANSWERS.NEVER
              }
              onChange={() =>
                setEpisodeNotifications(NOTIFY_EPSIODE_ANSWERS.NEVER)
              }
            />
            Never
          </label>
          <label>
            <input
              name="notify-for-new-epsiode"
              type="radio"
              checked={
                state.shouldNotifiyForNewEpisodes ===
                NOTIFY_EPSIODE_ANSWERS.ALWAYS
              }
              onChange={() =>
                setEpisodeNotifications(NOTIFY_EPSIODE_ANSWERS.ALWAYS)
              }
            />
            Always
          </label>
          <label>
            <input
              name="notify-for-new-epsiode"
              type="radio"
              checked={
                state.shouldNotifiyForNewEpisodes ===
                NOTIFY_EPSIODE_ANSWERS.LATEST
              }
              onChange={() =>
                setEpisodeNotifications(NOTIFY_EPSIODE_ANSWERS.LATEST)
              }
            />
            When on latest epsiode
          </label>
        </div>
      </div>
    </div>
  );
};

export default OtherOptions;
