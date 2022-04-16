import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import {
  Paper,
  Box,
  Stack,
  Typography,
  TextField,
  ButtonGroup,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { createApiInstance, getApiInstance } from "../../../providers/builder";
import { PROVIDERS } from "../../../enums";
import lang from "lang";

const KitsuLogin = () => {
  const { register, handleSubmit } = useForm();
  const [formEnabled, setFormEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      const api = await getApiInstance();
      if ((await api?.isAuthenticated()) === true) {
        window.location.href = "/options/index.html";
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    setFormEnabled(false);
    const provider = createApiInstance(PROVIDERS.KITSU);
    try {
      await provider.authorize(values.username, values.password);
      window.location.href = "/options/index.html";
    } catch (e) {
      setFormEnabled(true);
      alert(lang.invalidCredentials);
    }
  };

  return (
    <Paper
      elevation={6}
      css={css`
        width: 80rem;
        margin: 32px auto;
        padding: 16px 32px;
      `}
    >
      <Box
        aria-label="Kitsu"
        role="img"
        css={css`
          height: 135px;
          width: 454px;
          margin: auto;
          background: url("/static/images/kitsu.png") no-repeat;
          background-size: cover;
        `}
      />
      <Box
        css={css`
          text-align: center;
        `}
      >
        <Typography variant="h1" fontSize="20px">
          {lang.kitsuLogIn}
        </Typography>
        <Typography variant="v2" fontSize="18px">
          {lang.logInAfter}
        </Typography>
      </Box>

      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        disabled={!formEnabled}
        spacing={4}
        css={css`
          width: 30rem;
          margin: 0 auto;
          padding-top: 32px;
        `}
      >
        <TextField
          label={lang.email}
          type="email"
          autoComplete="off"
          fullWidth
          {...register("username", { required: true })}
        />

        <TextField
          label={lang.password}
          type="password"
          fullWidth
          {...register("password", { required: true })}
        />

        <ButtonGroup
          css={css`
            margin: 0 auto;
            justify-content: center;
          `}
        >
          <Button type="submit" disabled={!formEnabled}>
            {lang.logInButton}
          </Button>
          <Button
            type="button"
            onClick={() => (window.location.href = "/options/index.html")}
          >
            {lang.cancelButton}
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
};

export default KitsuLogin;
