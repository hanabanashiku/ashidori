import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, LinearProgress, Typography, Input } from "@mui/material";
import ApiProvider from "../../providers/ApiProvider";
import { LIST_STATUS } from "../../enums";
import EditableCell from "./EditableCell";
import lang from "lang";

const Progress = ({ value: { id, current, total, api, refresh } }) => {
  async function updateValue(value) {
    const completed = value === total;
    const patch = { progress: value };
    if (completed) {
      patch.status = LIST_STATUS.COMPLETED;
      patch.completedDate = new Date();
    }
    await api.updateLibraryItem(id, patch);
    if (completed) {
      refresh();
    }
  }

  return (
    <EditableCell
      initialValue={current}
      saveValue={updateValue}
      renderCell={({ value, onClick }) => {
        const normalizedTotal = total ? total : current * 12;
        const progress = (current / normalizedTotal) * 100;

        return (
          <Box
            css={css`
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
            `}
            onClick={onClick}
            role="button"
            aria-expanded="false"
          >
            <Typography component="div">
              {total ? `${value}/${total}` : `${value}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              css={css`
                position: absolute;
                bottom: 0;
                width: 100%;
              `}
            />
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
            <Input
              type="number"
              value={value}
              inputProps={{ min: 0, max: total }}
              placeholder={lang.episode}
              disabled={disabled}
              error={error}
              onKeyDown={onKeyDown}
              onChange={(e) => onChange(e.target.valueAsNumber)}
              onBlur={onBlur}
              autoFocus
              aria-label={lang.currentEpisode}
            />
            / {total}
          </Box>
        );
      }}
    />
  );
};
Progress.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number,
    api: PropTypes.instanceOf(ApiProvider).isRequired,
    refresh: PropTypes.func.isRequired,
  }),
};

export default Progress;
