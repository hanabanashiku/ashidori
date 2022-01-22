import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Delete } from "@mui/icons-material";
import LibraryEntry from "../../models/LibraryEntry";
import ApiProvider from "../../providers/ApiProvider";
import { LIST_STATUS } from "../../enums";

const ListForm = ({ entry, api, close }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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

  async function onSubmit(values) {}

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} padding="8px">
      <Stack spacing={4} direction="column">
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControl fullWidth>
              <InputLabel id={`${name}-label`}>Library status</InputLabel>
              <Select
                labelId={`${name}-label`}
                id={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
              >
                <MenuItem value={LIST_STATUS.CURRENT}>
                  Currently watching
                </MenuItem>
                <MenuItem value={LIST_STATUS.PLANNED}>Want to watch</MenuItem>
                <MenuItem value={LIST_STATUS.COMPLETED}>
                  Finished watching
                </MenuItem>
                <MenuItem value={LIST_STATUS.ON_HOLD}>On hold</MenuItem>
                <MenuItem value={LIST_STATUS.DROPPED}>Dropped</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <TextField
          id="progress"
          type="number"
          label="Progress"
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
          })}
          error={!!errors.progress}
          helperText={errors.progress?.message}
        />

        <Controller
          name="rating"
          control={control}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <FormControl fullWidth>
              <InputLabel id={`${name}-label`}>Rating</InputLabel>
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
                label="Started"
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
                label="Finished"
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
          label="Notes"
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
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
        <Button
          type="cancel"
          color="secondary"
          variant="contained"
          onClick={close}
        >
          Cancel
        </Button>
        <IconButton color="error" variant="contained">
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};
ListForm.propTypes = {
  entry: PropTypes.instanceOf(LibraryEntry).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  close: PropTypes.func.isRequired,
};

export default ListForm;
