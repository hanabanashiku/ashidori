import React, { useReducer, useEffect } from 'react';
import { css } from '@emotion/react';
import {
    Box,
    Typography,
    FormGroup,
    InputLabel,
    Input,
    Checkbox,
    RadioGroup,
    Radio,
    Select,
    MenuItem,
} from '@mui/material';
import Settings from './Settings';
import { NOTIFY_EPSIODE_ANSWERS, TITLE_LANGUAGE_PREFERENCES } from '../enums';
import lang from 'lang';

const reducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return {
                ...action.payload,
            };

        case 'enableUpdating':
            Settings.setListUpdatingEnabled(action.payload);
            return {
                ...state,
                listUpdatingEnabled: action.payload,
            };

        case 'setUpdatePopup':
            Settings.setShouldShowUpdatePopup(action.payload);
            return {
                ...state,
                shouldShowUpdatePopup: action.payload,
            };

        case 'setAddPopup':
            Settings.setShouldShowAddPopup(action.payload);
            return {
                ...state,
                shouldShowAddPopup: action.payload,
            };

        case 'setCheckForNewEpisodes':
            Settings.setShouldCheckForNewEpisodes(action.payload);
            return {
                ...state,
                shouldCheckForNewEpisodes: action.payload,
            };

        case 'setCheckForNewEpisodesAfter':
            Settings.setCheckForNewEpisodesAfterMinutes(action.payload);
            return {
                ...state,
                checkForNewEpisodesAfter: action.payload,
            };

        case 'setEpisodeNotifications':
            Settings.setNotifiyForNewEpisodes(action.payload);
            return {
                ...state,
                shouldNotifiyForNewEpisodes: action.payload,
            };

        case 'setUpdateDelay':
            Settings.setShouldUpdateAfterMinutes(action.payload);
            return {
                ...state,
                updateDelay: action.payload,
            };

        case 'setTitleLanguagePreference':
            Settings.setTitleLanguagePreference(action.payload);
            return {
                ...state,
                titleLanguagePreference: action.payload,
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
            const listUpdatingEnabled = Settings.listUpdatingEnabled();
            const shouldShowUpdatePopup = Settings.shouldShowUpdatePopup();
            const shouldShowAddPopup = Settings.shouldShowAddPopup();
            const shouldCheckForNewEpisodes =
                Settings.shouldCheckForNewEpisodes();
            const checkForNewEpisodesAfter =
                Settings.checkForNewEpisodesAfterMinutes();
            const shouldNotifiyForNewEpisodes =
                Settings.shouldNotifiyForNewEpisodes();
            const updateDelay = Settings.shouldUpdateAfterMinutes();
            const titleLanguagePreference =
                Settings.getTitleLanguagePreference();

            dispatch({
                type: 'init',
                payload: {
                    listUpdatingEnabled: await listUpdatingEnabled,
                    shouldShowUpdatePopup: await shouldShowUpdatePopup,
                    shouldShowAddPopup: await shouldShowAddPopup,
                    shouldCheckForNewEpisodes: await shouldCheckForNewEpisodes,
                    checkForNewEpisodesAfter: await checkForNewEpisodesAfter,
                    shouldNotifiyForNewEpisodes:
                        await shouldNotifiyForNewEpisodes,
                    updateDelay: await updateDelay,
                    titleLanguagePreference: await titleLanguagePreference,
                },
            });
        })();
    }, [dispatch]);

    const toggleListUpdateEnabled = (value) => {
        dispatch({
            type: 'enableUpdating',
            payload: value,
        });
    };

    const toggleUpdatePopup = (value) => {
        dispatch({
            type: 'setUpdatePopup',
            payload: value,
        });
    };

    const toggleAddPopup = (value) => {
        dispatch({
            type: 'setAddPopup',
            payload: value,
        });
    };

    const toggleCheckForNewEpsiodes = (value) => {
        dispatch({
            type: 'setCheckForNewEpisodes',
            payload: value,
        });
    };

    const setNewEpisodeCheckDelay = (value) => {
        dispatch({
            type: 'setCheckForNewEpisodesAfter',
            payload: value,
        });
    };

    const setEpisodeNotifications = (value) => {
        dispatch({
            type: 'setEpisodeNotifications',
            payload: value,
        });
    };

    const setUpdateMinutes = (value) => {
        dispatch({
            type: 'setUpdateDelay',
            payload: value,
        });
    };

    const setTitleLanguagePreference = (value) => {
        dispatch({
            type: 'setTitleLanguagePreference',
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
                <Checkbox
                    name="enable-list-update"
                    checked={state.listUpdatingEnabled}
                    onChange={(e) => toggleListUpdateEnabled(e.target.checked)}
                    size="small"
                />
                {lang.autoUpdateList}
            </InputLabel>
            <InputLabel
                css={css`
                    margin-left: 24px;
                `}
            >
                Wait&nbsp;
                <Input
                    type="number"
                    variant="outlined"
                    min="0"
                    max="25"
                    value={state.updateDelay}
                    onChange={(e) => setUpdateMinutes(e.target.value)}
                    sx={{ width: '3.5rem' }}
                    disabled={!state.listUpdatingEnabled}
                />
                minutes before updating episode progress.
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
                    disabled={!state.listUpdatingEnabled}
                />
                {lang.askBeforeUpdating}
            </InputLabel>
            <InputLabel
                css={css`
                    margin-top: -16px;
                    margin-left: 16px;
                `}
            >
                <Checkbox
                    name="should-show-add-poppup"
                    checked={state.shouldShowAddPopup}
                    onChange={(e) => toggleAddPopup(e.target.checked)}
                    size="small"
                    disabled={!state.listUpdatingEnabled}
                />
                {lang.askBeforeAdding}
            </InputLabel>
            <InputLabel>
                <Checkbox
                    name="should-check-for-new-episodes"
                    checked={state.shouldCheckForNewEpisodes}
                    onChange={(e) =>
                        toggleCheckForNewEpsiodes(e.target.checked)
                    }
                    size="small"
                />
                Check for new episodes
            </InputLabel>
            <InputLabel
                css={css`
                    margin-left: 24px;
                `}
            >
                Check for new episodes after&nbsp;
                <Select
                    name="check-for-new-episodes-after"
                    size="small"
                    variant="standard"
                    disabled={!state.shouldCheckForNewEpisodes}
                    value={state.checkForNewEpisodesAfter}
                    onChange={(e) => setNewEpisodeCheckDelay(e.target.value)}
                >
                    <MenuItem value={10}>10 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={2 * 60}>2 hours</MenuItem>
                    <MenuItem value={12 * 60}>12 hours</MenuItem>
                    <MenuItem value={24 * 60}>1 day</MenuItem>
                </Select>
            </InputLabel>
            <FormGroup
                css={css`
                    margin-left: 24px;
                `}
            >
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
                            disabled={!state.shouldCheckForNewEpisodes}
                            checked={
                                state.shouldNotifiyForNewEpisodes ===
                                NOTIFY_EPSIODE_ANSWERS.NEVER
                            }
                            onChange={() =>
                                setEpisodeNotifications(
                                    NOTIFY_EPSIODE_ANSWERS.NEVER
                                )
                            }
                        />
                        {lang.never}
                    </InputLabel>
                    <InputLabel>
                        <Radio
                            name="notify-for-new-epsiode"
                            size="small"
                            disabled={!state.shouldCheckForNewEpisodes}
                            checked={
                                state.shouldNotifiyForNewEpisodes ===
                                NOTIFY_EPSIODE_ANSWERS.ALWAYS
                            }
                            onChange={() =>
                                setEpisodeNotifications(
                                    NOTIFY_EPSIODE_ANSWERS.ALWAYS
                                )
                            }
                        />
                        {lang.always}
                    </InputLabel>
                    <InputLabel>
                        <Radio
                            name="notify-for-new-epsiode"
                            size="small"
                            disabled={!state.shouldCheckForNewEpisodes}
                            checked={
                                state.shouldNotifiyForNewEpisodes ===
                                NOTIFY_EPSIODE_ANSWERS.LATEST
                            }
                            onChange={() =>
                                setEpisodeNotifications(
                                    NOTIFY_EPSIODE_ANSWERS.LATEST
                                )
                            }
                        />
                        {lang.latestEpisodeRadio}
                    </InputLabel>
                </RadioGroup>
            </FormGroup>
            <FormGroup>
                <Typography>{lang.showTitleLanguage}</Typography>
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
                            name="show-title-language"
                            size="small"
                            checked={
                                state.titleLanguagePreference ===
                                TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE
                            }
                            onChange={() =>
                                setTitleLanguagePreference(
                                    TITLE_LANGUAGE_PREFERENCES.UI_LANGUAGE
                                )
                            }
                        />
                        {lang.defaultTitleLanguage}
                    </InputLabel>
                    <InputLabel>
                        <Radio
                            name="show-title-language"
                            size="small"
                            checked={
                                state.titleLanguagePreference ===
                                TITLE_LANGUAGE_PREFERENCES.ROMAJI
                            }
                            onChange={() =>
                                setTitleLanguagePreference(
                                    TITLE_LANGUAGE_PREFERENCES.ROMAJI
                                )
                            }
                        />
                        {lang.romajiTitleLanguage}
                    </InputLabel>
                </RadioGroup>
            </FormGroup>
        </Box>
    );
};

export default OtherOptions;
