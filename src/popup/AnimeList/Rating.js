import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, Typography, Input } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import ApiProvider from "../../providers/ApiProvider";
import EditableCell from "./EditableCell";
import lang from "lang";

const Rating = ({ value: { id, rating, api } }) => {
  async function updateValue(value) {
    return api.updateLibraryItem(id, { rating: value });
  }

  return (
    <EditableCell
      initialValue={rating}
      saveValue={updateValue}
      renderCell={({ value, onClick }) => {
        return (
          <Box
            css={css`
              display: inline-flex;
              align-items: center;
            `}
            onClick={onClick}
          >
            {value > 0 && (
              <>
                <Star htmlColor="gold" />
                <Typography>{value}</Typography>
              </>
            )}
            {!value && (
              <>
                <StarBorder />
                <Typography variant="caption" component="div" marginTop={1}>
                  {lang.rate}
                </Typography>
              </>
            )}
          </Box>
        );
      }}
      renderEditView={({
        value,
        disabled,
        error,
        onKeyDown,
        onChange,
        onBlur,
      }) => {
        return (
          <Box>
            <Star htmlColor="gold" />
            <Input
              type="number"
              value={value}
              placeholder={lang.rating}
              disabled={disabled}
              error={error}
              onKeyDown={onKeyDown}
              onChange={(e) => onChange(e.target.valueAsNumber)}
              onBlur={onBlur}
              inputProps={{
                min: 0,
                max: 10,
                step: 0.5,
              }}
              aria-label={lang.seriesRating}
              autoFocus
            />
          </Box>
        );
      }}
    />
  );
};
Rating.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.number.isRequired,
    api: PropTypes.instanceOf(ApiProvider),
  }).isRequired,
};

export default Rating;
