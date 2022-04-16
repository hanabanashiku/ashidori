import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import ApiProvider from "../../providers/ApiProvider";
import AnimeData from "./AnimeData";
import ListForm from "./ListForm";

const AnimeDetail = ({ selectedAnime, isListEntryId, close, api }) => {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = isListEntryId
          ? await api.getSingleLibraryEntry(selectedAnime)
          : await api.getSingleLibraryEntryByAnime(selectedAnime);
        setAnime(result);
      } catch (e) {
        setAnime("error");
      }
    })();
  }, [selectedAnime, setAnime]);

  if (!anime) {
    return <CircularProgress />;
  }

  if (anime === "error") {
    return (
      <Alert severity="error">
        An error occurred getting the details for the selected anime.
      </Alert>
    );
  }

  return (
    <Box>
      <Button startIcon={<KeyboardBackspace />} onClick={close}>
        Back
      </Button>
      <AnimeData anime={anime.anime} />
      <ListForm entry={anime} api={api} close={close} />
    </Box>
  );
};
AnimeDetail.propTypes = {
  selectedAnime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  close: PropTypes.func.isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  isListEntryId: PropTypes.bool.isRequired,
};

export default AnimeDetail;
