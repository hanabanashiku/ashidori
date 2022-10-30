import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import ApiProvider from '../../providers/ApiProvider';
import LoadingOverlay from './LoadingOverlay';
import { buildColumns, editableColumns } from './columns';
import { LIST_STATUS } from '../../enums';

const DEFAULT_PAGE_SIZE = 25;

const AnimeList = ({ status, hide, showAnime, showError, api }) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const { data, isLoading, refetch } = useQuery(
        ['animeList', status],
        async () => {
            return status === LIST_STATUS.CURRENT
                ? await api.getAnimeListByStatus(
                      status,
                      page,
                      pageSize,
                      'lastUpdated',
                      'desc'
                  )
                : await api.getAnimeListByStatus(status, page, pageSize);
        },
        {
            staleTime: 15 * 60 * 1000,
            enabled: !hide && !!api,
            onError: () => showError(),
        }
    );

    const itemCount = data?.total ?? 0;

    function onCellClick(params, e) {
        e.defaultMuiPrevented = true;
        if (editableColumns.includes(params.field)) {
            return;
        }
        showAnime(params.id);
    }

    const columns = useMemo(() => buildColumns(status), [status]);

    /**
     *
     * @param {LibraryEntry} item
     * @returns
     */
    function buildRow(item) {
        const common = {
            id: item.id,
            api,
            refetch,
        };

        return {
            id: item.id,
            title: item.anime.title,
            episodeCount: item.anime.episodeCount,
            progress: {
                ...common,
                current: item.progress,
                total: item.anime.episodeCount,
            },
            startSeason: item.anime.startSeason,
            rating: {
                ...common,
                rating: item.rating,
            },
        };
    }

    if (hide) {
        return null;
    }

    const rows = data?.data.map((item) => buildRow(item)) ?? [];

    return (
        <DataGrid
            css={css`
                border: none;
                margin: 0;
                height: 490px;
            `}
            loading={isLoading}
            columns={columns}
            rows={rows}
            rowCount={itemCount}
            pageSize={pageSize}
            onPageSizeChange={(size) => setPageSize(size)}
            onCellClick={onCellClick}
            onRowDoubleClick={(params) => showAnime(params.id)}
            paginationMode="server"
            onPageChange={(p) => setPage(p)}
            page={page}
            rowsPerPageOptions={[10, 25, 30, 50, 100]}
            disableSelectionOnClick
            disableColumnFilter
            components={{
                LoadingOverlay: LoadingOverlay,
            }}
        />
    );
};
AnimeList.propTypes = {
    status: PropTypes.oneOf(Object.values(LIST_STATUS)).isRequired,
    hide: PropTypes.bool.isRequired,
    showAnime: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    api: PropTypes.instanceOf(ApiProvider).isRequired,
};

export default AnimeList;
