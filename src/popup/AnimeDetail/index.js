import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useQueryClient } from 'react-query';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';
import ApiProvider from '../../providers/ApiProvider';
import AnimeData from './AnimeData';
import ListForm from './ListForm';
import { resetSearchPage } from '../../helpers/storageHelpers';
import lang from '../../lang';

const AnimeDetail = ({
    selectedAnime,
    isListEntryId,
    close,
    api,
    toggleSearch,
    isPopup,
}) => {
    const queryClient = useQueryClient();
    const {
        data: libraryEntry,
        isFetching,
        isError,
        remove,
    } = useQuery(
        ['animeDetail', isListEntryId, selectedAnime],
        async () => {
            return isListEntryId
                ? await api.getSingleLibraryEntry(selectedAnime)
                : await api.getSingleLibraryEntryByAnime(selectedAnime);
        },
        {
            enabled: !!api,
        }
    );

    function closeDetail(saving) {
        if (saving) {
            remove();
            queryClient.removeQueries(['animeList']);

            if (toggleSearch) {
                resetSearchPage();
                toggleSearch();
            }
        }

        close();
    }

    if (isError) {
        return (
            <Alert severity="error">
                {lang.errorOccurredTitle} {lang.errorOccurredBody}
            </Alert>
        );
    }

    if (isFetching || !libraryEntry) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Button startIcon={<KeyboardBackspace />} onClick={close}>
                {isPopup ? lang.backButton : lang.closeButton}
            </Button>
            <AnimeData anime={libraryEntry.anime} />
            <ListForm entry={libraryEntry} api={api} close={closeDetail} />
        </Box>
    );
};
AnimeDetail.propTypes = {
    selectedAnime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    close: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(ApiProvider).isRequired,
    isListEntryId: PropTypes.bool.isRequired,
    toggleSearch: PropTypes.func,
    isPopup: PropTypes.bool.isRequired,
};

export default AnimeDetail;
