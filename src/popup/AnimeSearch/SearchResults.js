import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Alert, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Title from '../AnimeList/Title';
import LoadingOverlay from '../AnimeList/LoadingOverlay';
import PagedData from '../../models/PagedData';
import lang from '../../lang';

const SearchResults = ({ results, showAnime, page, setPage, loading }) => {
    const isError = results === 'error';

    if (!results) {
        return (
            <Typography height="450px" my="32px" mx="8px" textAlign="center">
                {lang.enterSearchTerm}
            </Typography>
        );
    }

    if (isError) {
        return <Alert severity="error">{lang.errorOccurredOnSearch}</Alert>;
    }

    const columns = [
        {
            field: 'title',
            headerName: lang.title,
            width: 280,
            renderCell: ({ value }) => <Title value={value} />,
            sortable: false,
        },
        {
            field: 'episodeCount',
            headerName: lang.episodes,
            width: 90,
            sortable: false,
        },
        {
            field: 'startSeason',
            headerName: lang.season,
            width: 100,
            sortable: false,
        },
    ];

    const rows = results.data.map((anime) => ({
        id: anime.id,
        title: anime.title,
        episodeCount: anime.episodeCount ?? lang.ongoing,
        startSeason: anime.startSeason,
    }));

    return (
        <DataGrid
            css={css`
                border: none;
                margin: 0;
                height: 490px;
            `}
            loading={loading}
            columns={columns}
            rows={rows}
            rowCount={results.total}
            pageSize={20}
            onCellClick={(params) => showAnime(params.id, false)}
            paginationMode="server"
            onPageChange={(p) => setPage(p)}
            page={page}
            disableSelectionOnClick
            disableColumnFilter
            components={{
                LoadingOverlay: LoadingOverlay,
            }}
        />
    );
};
SearchResults.propTypes = {
    results: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(PagedData),
    ]),
    showAnime: PropTypes.func.isRequired,
    page: PropTypes.number,
    setPage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};
SearchResults.defaultProps = {
    results: null,
    page: 0,
};

export default SearchResults;
