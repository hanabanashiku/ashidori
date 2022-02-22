import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Rating, Typography } from "@mui/material";
import LibraryEntry from "../../../models/LibraryEntry";
import ApiProvider from "../../../providers/ApiProvider";
import { LIST_STATUS } from "../../../enums";

function EntryRating({ libraryEntry, api }) {
  const [value, setRating] = useState(libraryEntry.rating);
  const [hover, setHover] = useState(-1);
  const [isLoading, setLoading] = useState(false);

  async function onChange(e, newValue) {
    setRating(newValue);
    setLoading(true);
    try {
      await api.updateLibrarItem(libraryEntry.id, {
        rating: newValue,
      });
    } catch {
      setRating(value);
    } finally {
      setLoading(false);
    }
  }

  async function onChangeActive(e, newHover) {
    setHover(newHover);
  }

  if (libraryEntry.status === LIST_STATUS.NOT_WATCHING) {
    return null;
  }

  return (
    <Box display="flex" alignItems="container">
      <Rating
        max={10}
        precision={0.5}
        value={value}
        onChange={onChange}
        onChangeActive={onChangeActive}
        readOnly={isLoading}
      />
      <Typography fontSize="sm" marginLeft={2}>
        {hover !== -1 ? hover : value > 0 ? value : ""}
      </Typography>
    </Box>
  );
}
EntryRating.propTypes = {
  libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
};

export default EntryRating;
