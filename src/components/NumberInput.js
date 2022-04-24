import React, { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import { TextField } from "@mui/material";

const NumberInput = forwardRef(function NumberInputWrapper(
  { id, ...rest },
  textRef
) {
  // We can't use a ref because of RHF
  // Chrome also won't allow us to prevent default directly. *shrug*
  useEffect(() => {
    $(`#${id}`).on("wheel", (e) => e.target.blur());
  }, []);

  return <TextField ref={textRef} type="number" id={id} {...rest} />;
});
NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NumberInput;
