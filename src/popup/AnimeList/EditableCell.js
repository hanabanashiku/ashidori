import { useState } from "react";
import PropTypes from "prop-types";

const EditableCell = ({
  initialValue,
  saveValue,
  renderCell,
  renderEditView,
  readonly,
}) => {
  const [currentValue, setValue] = useState(initialValue);
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  function toggleEditing() {
    if (readonly) {
      return;
    }

    setEditing((value) => !value);
  }

  function onEdit(e) {
    setSaving(true);
    (async () => {
      try {
        await saveValue(currentValue);
        setEditing(false);
        if (error) setError(false);
      } catch (e) {
        setError(true);
      } finally {
        setSaving(false);
      }
    })();
    e?.preventDefault();
  }

  function onKeyDown(e) {
    switch (e.key) {
      case "Escape":
        setValue(initialValue);
        setEditing(false);
        e.preventDefault();
        break;

      case "Enter":
        onEdit(e);
        break;
    }
  }

  if (isEditing) {
    return renderEditView({
      value: currentValue,
      disabled: isSaving,
      error: error,
      onKeyDown,
      onChange: (v) => setValue(v),
      onBlur: (e) => onEdit(e),
    });
  }

  return renderCell({
    value: currentValue,
    onClick: toggleEditing,
  });
};
EditableCell.propTypes = {
  initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  saveValue: PropTypes.func.isRequired,
  renderCell: PropTypes.func.isRequired,
  renderEditView: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
};
EditableCell.defaultProps = {
  readonly: false,
};

export default EditableCell;
