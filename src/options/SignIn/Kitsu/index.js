import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { returnToOptions } from "../util";
import {
  Box,
  Stack,
  Alert,
  Typography,
  TextField,
  ButtonGroup,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Layout from "../../layout";
import {
  createApiInstance,
  getApiInstance,
  resetApiInstance,
} from "../../../providers/builder";
import { PROVIDERS } from "../../../enums";
import lang from "lang";

const KitsuLogin = () => {
  const { register, handleSubmit } = useForm();
  const [formEnabled, setFormEnabled] = useState(true);
  const [isValid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const api = await getApiInstance();
      if (await api?.isAuthenticated()) {
        returnToOptions(navigate);
      }
    })();
  }, []);

  async function onSubmit(values) {
    setFormEnabled(false);
    const provider = createApiInstance(PROVIDERS.KITSU);
    try {
      await provider.authorize(values.username, values.password);
      returnToOptions(navigate);
    } catch (e) {
      resetApiInstance();
      setValid(false);
      setFormEnabled(true);
    }
  }

  return (
    <Layout>
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
        {!isValid && <Alert severity="error">{lang.invalidCredentials}</Alert>}

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
          <Button type="button" onClick={() => returnToOptions(navigate)}>
            {lang.cancelButton}
          </Button>
        </ButtonGroup>
      </Stack>
    </Layout>
  );
};

export default KitsuLogin;
