import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AnimeSeries from "../../models/AnimeSeries";
import ApiProvider from "../../providers/ApiProvider";

const DeleteModal = ({ entryId, anime, api, close, modalRef }) => {
  const [isOpen, setOpen] = useState(false);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    modalRef.current = () => setOpen(true);
  }, []);

  function handleClose() {
    setOpen(false);
  }

  async function onDelete() {
    try {
      setSaving(true);
      await api.removeLibraryItem(entryId);
      close();
    } catch (e) {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Delete this library entry?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Continuing will permanently delete {anime.title} from your anime list.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <LoadingButton
          onClick={() => onDelete()}
          loading={isSaving}
          loadingIndicator="Deleting..."
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
DeleteModal.propTypes = {
  entryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  anime: PropTypes.instanceOf(AnimeSeries).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  close: PropTypes.func.isRequired,
  modalRef: PropTypes.object.isRequired,
};

export default DeleteModal;
