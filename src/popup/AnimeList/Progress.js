import React, { useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { Box, LinearProgress, Typography, Input } from "@mui/material";
import ApiProvider from "../../providers/ApiProvider";

const Progress = ({ value: { id, current, total, api } }) => {
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [currentValue, setValue] = useState(current);
  const normalizedTotal = total ? total : current * 12;
  const progress = (current / normalizedTotal) * 100;

  function onEdit(e) {
    setSaving(true);
    (async () => {
      try {
        await api.updateLibraryItem(id, { progress: currentValue });
        setEditing(false);
        if (error) setError(false);
      } catch (e) {
        setError(true);
      } finally {
        setSaving(false);
      }
    })();
    e.preventDefault();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      setValue(current);
      setEditing(false);
      e.preventDefault();
    }
    if (e.key === "Enter") {
      onEdit(e);
    }
  }

  if (isEditing) {
    return (
      <Box>
        <Input
          type="number"
          value={currentValue}
          inputProps={{ min: 0, max: total }}
          placeholder="Episode"
          disabled={isSaving}
          error={error}
          onKeyDown={(e) => onKeyDown(e)}
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onBlur={(e) => onEdit(e)}
          autoFocus
        />
        / {total}
      </Box>
    );
  }

  return (
    <Box
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
      `}
      onClick={() => setEditing(true)}
    >
      <Typography component="div">
        {total ? `${currentValue}/${total}` : `${currentValue}`}
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
};
Progress.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    current: PropTypes.number.isRequired,
    total: PropTypes.number,
    api: PropTypes.instanceOf(ApiProvider),
  }),
};

export default Progress;
