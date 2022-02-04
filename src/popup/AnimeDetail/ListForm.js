import React, { useRef } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { css } from "@emotion/react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { LoadingButton, DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Save as SaveIcon, Delete } from "@mui/icons-material";
import DeleteModal from "./DeleteModal";
import LibraryEntry from "../../models/LibraryEntry";
import ApiProvider from "../../providers/ApiProvider";
import { LIST_STATUS } from "../../enums";
import lang from "lang";

const ListForm = ({ entry, api, close }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, dirtyFields, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      status: entry.status,
      progress: entry.progress,
      rating: entry.rating,
      rewatchCount: entry.rewatchCount,
      startDate: entry.startDate,
      completedDate: entry.completedDate,
      notes: entry.notes,
    },
  });
  const modalRef = useRef();

  async function onSubmit(values) {
    if (!isDirty) {
      close();
      return;
    }

    const toPatch = Object.keys(dirtyFields).filter((key) => dirtyFields[key]);
    const patch = _.pick(values, toPatch);
    await api.updateLibraryItem(entry.id, patch);
    close();
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      padding="8px"
      data-testid="detail-form"
    >
      <Stack spacing={4} direction="column">
        <Controller
          name="status"
          control={control}
          defaultValue={entry.status}
          rules={{ valueAsNumber: true }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControl fullWidth>
              <InputLabel id={`${name}-label`}>{lang.libraryStatus}</InputLabel>
              <Select
                labelId={`${name}-label`}
                id={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
              >
                <MenuItem value={LIST_STATUS.CURRENT}>{lang.watching}</MenuItem>
                <MenuItem value={LIST_STATUS.PLANNED}>
                  {lang.plannedLong}
                </MenuItem>
                <MenuItem value={LIST_STATUS.COMPLETED}>
                  {lang.completedLong}
                </MenuItem>
                <MenuItem value={LIST_STATUS.ON_HOLD}>{lang.onHold}</MenuItem>
                <MenuItem value={LIST_STATUS.DROPPED}>{lang.dropped}</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <TextField
          id="progress"
          type="number"
          label={lang.progress}
          variant="outlined"
          InputProps={{
            min: 0,
            max:
              entry.anime.episodeCount > 0
                ? entry.anime.episodeCount
                : undefined,
            step: 1,
            endAdornment:
              entry.anime.episodeCount > 0 ? (
                <InputAdornment position="end">
                  / {entry.anime.episodeCount}
                </InputAdornment>
              ) : undefined,
          }}
          {...register("progress", {
            min: 0,
            max:
              entry.anime.episodeCount > 0
                ? entry.anime.episodeCount
                : undefined,
            pattern: /^\d*$/,
            valueAsNumber: true,
          })}
          error={!!errors.progress}
          helperText={errors.progress?.message}
        />

        <Controller
          name="rating"
          control={control}
          rules={{ valueAsNumber: true }}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <FormControl fullWidth>
              <InputLabel
                id={`${name}-label`}
                css={css`
                  padding-top: 8px;
                `}
              >
                ⭐ &nbsp; {lang.rating}
              </InputLabel>
              <Slider
                id={name}
                name={name}
                value={value}
                min={0}
                max={10}
                step={0.5}
                onChange={onChange}
                onBlur={onBlur}
                valueLabelDisplay="auto"
                aria-labelledby={`${name}-label`}
              />
            </FormControl>
          )}
        />

        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={lang.startedDate}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          name="completedDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={lang.finishedDate}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                renderInput={(props) => <TextField {...props} />}
              />
            </LocalizationProvider>
          )}
        />

        <TextField
          id="notes"
          label={lang.notes}
          maxRows={4}
          multiline
          fullWidth
          {...register("notes")}
        />
      </Stack>
      <Box
        css={css`
          width: 50%;
          margin: 0 auto;
          margin-top: 16px;
          & > Button:not(:first-of-type) {
            margin-left: 8px;
          }
        `}
      >
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          loadingPosition="start"
          startIcon={<SaveIcon />}
          loading={isSubmitting}
        >
          {lang.saveButton}
        </LoadingButton>
        <Button
          type="cancel"
          color="secondary"
          variant="contained"
          onClick={close}
        >
          Cancel
        </Button>
        <IconButton
          color="error"
          variant="contained"
          onClick={() => modalRef.current()}
          aria-label={lang.removeFromList}
        >
          <Delete />
        </IconButton>
      </Box>
      <DeleteModal
        entryId={entry.id}
        anime={entry.anime}
        api={api}
        close={close}
        modalRef={modalRef}
      />
    </Box>
  );
};
ListForm.propTypes = {
  entry: PropTypes.instanceOf(LibraryEntry).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  close: PropTypes.func.isRequired,
};

export default ListForm;
