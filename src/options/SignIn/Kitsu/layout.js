import React, { useState } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import { createApiInstance } from "../../../providers/builder";
import { PROVIDERS } from "../../../enums";

const KitsuLogin = () => {
  const { register, handleSubmit } = useForm();
  const [formEnabled, setFormEnabled] = useState(true);

  const onSubmit = async (values) => {
    setFormEnabled(false);
    const provider = createApiInstance(PROVIDERS.KITSU);
    try {
      await provider.authorize(values.username, values.password);
      window.location.href = "/options/index.html";
    } catch (e) {
      setFormEnabled(true);
      alert("Invalid username or password.");
    }
  };

  return (
    <div
      css={css`
        width: 80rem;
        margin: 32px auto;
        padding: 16px 32px;
        border: 2px solid black;
        box-shadow: 3px 2px 5px grey;
      `}
    >
      <div
        css={css`
          height: 135px;
          width: 454px;
          margin: auto;
          background: url("/static/images/kitsu.png") no-repeat;
          background-size: cover;
        `}
      />
      <div
        css={css`
          text-align: center;
          line-height: 0.7;
        `}
      >
        <h1>Sign In to Kitsu</h1>
        <h2>
          After, you will be returned to Ashidori. Your password will not be
          saved.
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        disabled={!formEnabled}
        css={css`
          width: 30rem;
          margin: 0 auto;
          padding-top: 16px;
          font-size: 18px;
          & > div {
            padding-bottom: 16px;
          }
          & label {
            display: block;
            padding-bottom: 4px;
          }

          & input {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            border-radius: 6px;
          }
        `}
      >
        <div>
          <label htmlFor="username">Email Address</label>
          <input
            type="email"
            name="username"
            placeholder="Email"
            autoComplete="off"
            {...register("username", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        <div
          css={css`
            width: max-content;
            margin: 0 auto;
            padding-top: 16px;
            & > button {
              font-size: 14px;
              height: 32px;
            }
            & > button:first-of-type {
              margin-right: 16px;
            }
          `}
        >
          <button type="submit" disabled={!formEnabled}>
            Log In
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/options/index.html")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default KitsuLogin;
