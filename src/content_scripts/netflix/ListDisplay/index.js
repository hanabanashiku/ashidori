import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import browser from "webextension-polyfill";
import util from "util";
import {
  Button,
  Card,
  CardContent,
  Popper,
  Typography,
  Stack,
} from "@mui/material";
import Progress from "../../common/Progress";
import Rating from "../../common/Rating";
import { onOpenDetail } from "../../common";
import LibraryEntry from "../../../models/LibraryEntry";
import ApiProvider from "../../../providers/ApiProvider";
import UserData from "../../../models/UserData";
import { PROVIDER_NAMES } from "../../../enums";
import lang from "../../../lang";

function ListDisplay({ libraryEntry, api, userData, forwardRef }) {
  return (
    <Card
      className="popup-content"
      data-uia="ashidori-display"
      ref={forwardRef}
      css={css`
        min-width: 325px;
        min-height: 160px;
        padding: 4px;
        background-color: rgb(38, 38, 38);
        p,
        h3,
        h6,
        a,
        span,
        button {
          font-family: Netflix Sans, Helvetica Heue, sans-serif;
          color: white;
        }
        & > p,
        span {
          font-size: 24px;
        }

        button,
        a {
          font-size: 16px;
        }
      `}
    >
      <CardContent>
        <Typography as="h3" fontSize="32px" fontWeight="bold">
          List status
        </Typography>
        <Typography variant="subtitle1" fontSize="16px">
          {libraryEntry.anime.title}
        </Typography>
        <Stack marginTop="12px" marginBottom="12px">
          <Typography fontSize="24px">
            {lang.listStatuses[libraryEntry.status]}
          </Typography>
          <Progress libraryEntry={libraryEntry} />
          <Rating libraryEntry={libraryEntry} api={api} />
        </Stack>
        <hr />
        <Stack margin-top="12px">
          <Button
            component="a"
            variant="text"
            href={libraryEntry.anime.externalLink}
            target="_blank"
          >
            {util.format(
              lang.viewOnProvider,
              PROVIDER_NAMES[userData.apiSource]
            )}
          </Button>
          <Button variant="text" onClick={() => onOpenDetail(libraryEntry)}>
            {lang.openInAshidori}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
ListDisplay.propTypes = {
  libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired,
  forwardRef: PropTypes.object,
};

function ListDisplayIcon({ libraryEntry, api, userData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);
  const open = Boolean(anchorEl);

  return (
    <div
      className="medium"
      onMouseOver={(e) => setAnchorEl(e.currentTarget)}
      onMouseLeave={() => {
        if (!popperRef.current?.parentNode.matches(":hover")) {
          setAnchorEl(null);
        }
      }}
      css={css`
        padding-left: 16px;
      `}
    >
      <Button>
        <img
          src={browser.runtime.getURL("static/icons/icon128_border.png")}
          height={40}
          width={40}
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        onMouseLeave={() => setAnchorEl(null)}
      >
        <ListDisplay
          libraryEntry={libraryEntry}
          api={api}
          userData={userData}
          forwardRef={popperRef}
        />
      </Popper>
    </div>
  );
}
ListDisplayIcon.propTypes = {
  libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired,
};

export default ListDisplayIcon;
