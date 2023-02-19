import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import util from 'util';
import Progress from '../../common/Progress';
import Rating from '../../common/Rating';
import { onOpenDetail } from '../../common';
import HidiveThemeProvider from '../theme';
import LibraryEntry from '../../../models/LibraryEntry';
import ApiProvider from '../../../providers/ApiProvider';
import UserData from '../../../models/UserData';
import { PROVIDER_NAMES } from '../../../enums';
import lang from '../../../lang';

function ListDisplay({ libraryEntry, api, userData }) {
    return (
        <HidiveThemeProvider>
            <h2>{lang.listStatus}</h2>
            <span>{libraryEntry.anime.title}</span>
            <p
                css={css`
                    margin-top: 4px;
                    font-weight: bold;
                `}
            >
                {lang.listStatuses[libraryEntry.status]}
            </p>
            <Progress libraryEntry={libraryEntry} />
            <Rating libraryEntry={libraryEntry} api={api} />
            <div
                css={css`
                    padding: 15px 0 15px 0;
                    & > button {
                        margin-left: 4px;
                    }
                `}
            >
                <a
                    className="btn btn-xs btn-primary"
                    href={libraryEntry.anime.externalLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="btn-text">
                        {util.format(
                            lang.viewOnProvider,
                            PROVIDER_NAMES[userData.apiSource]
                        )}
                    </span>
                </a>
                <button
                    className="btn btn-xs btn-primary"
                    onClick={() => onOpenDetail(libraryEntry)}
                >
                    <span className="btn-text">{lang.openInAshidori}</span>
                </button>
            </div>
        </HidiveThemeProvider>
    );
}
ListDisplay.propTypes = {
    libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
    api: PropTypes.instanceOf(ApiProvider).isRequired,
    userData: PropTypes.instanceOf(UserData).isRequired,
};

export default ListDisplay;
