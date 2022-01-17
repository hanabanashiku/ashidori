import React, { useState } from "react";
import PropTypes from "prop-types";
import { Popover, Typography } from "@mui/material";

const Title = ({ value }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handlePopoverOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {value}
      </span>
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, maxWidth: "300px", overflow: "wrap" }}>
          {value}
        </Typography>
      </Popover>
    </>
  );
};
Title.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Title;
