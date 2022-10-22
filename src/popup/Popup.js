import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { Box, CircularProgress } from '@mui/material';
import { getApiInstance } from '../providers/builder';
import Header from './Header';
import LogInNotice from './LogInNotice';
import AnimeDetail from './AnimeDetail';
import ListTabs from './ListTabs';
import AnimeSearch from './AnimeSearch';

const Popup = () => {
    const [authState, setAuthState] = useState(null);
    const [selectedAnime, setSelectedAnime] = useState();
    const [search, setSearch] = useState(false);
    const { search: query } = useLocation();
    const navigate = useNavigate();
    const params = useMemo(() => new URLSearchParams(query), [query]);

    const [api, setApi] = useState(null);

    function showAnime(id, isListEntry = true) {
        setSelectedAnime({ id, isListEntry });
    }

    function toggleSearch() {
        setSearch(!search);
    }

    useEffect(() => {
        if (params.has('detail')) {
            navigate(`detail/${params.get('detail')}`);
        }
    }, []);

    useEffect(() => {
        (async () => {
            const apiInstance = await getApiInstance();
            setApi(apiInstance);
            if (!apiInstance) {
                setAuthState(false);
                return;
            }
            setAuthState(await apiInstance.isAuthenticated());
        })();
    }, [setAuthState, setApi]);

    const Body = () => {
        if (authState === null) {
            return (
                <Box
                    css={css`
                        display: flex;
                        height: 420px;
                        padding: 0;
                        margin: 0;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    <CircularProgress />
                </Box>
            );
        }

        if (!authState) {
            return <LogInNotice />;
        }

        if (selectedAnime) {
            return (
                <AnimeDetail
                    selectedAnime={selectedAnime?.id}
                    api={api}
                    isListEntryId={selectedAnime?.isListEntry}
                    close={() => setSelectedAnime(null)}
                    toggleSearch={search ? toggleSearch : undefined}
                    isPopup
                />
            );
        }

        if (search) {
            return (
                <AnimeSearch
                    api={api}
                    toggleSearch={toggleSearch}
                    showAnime={showAnime}
                />
            );
        }

        return (
            <ListTabs
                showAnime={showAnime}
                api={api}
                toggleSearch={toggleSearch}
            />
        );
    };

    return (
        <>
            <Header />
            <Body />
        </>
    );
};

export default Popup;
