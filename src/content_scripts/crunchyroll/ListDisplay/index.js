import React from "react";
import PropTypes from "prop-types";
import browser from "webextension-polyfill";
import { css } from "@emotion/react";
import CrunchyrollThemeProvider from "../theme";
import { Box, Stack, Typography, Button } from "@mui/material";
import Progress from "./Progress";
import Rating from "./Rating";
import LibraryEntry from "../../../models/LibraryEntry";
import ApiProvider from "../../../providers/ApiProvider";
import MESSAGE_TYPES from "../../../messageTypes";
import lang from "../../../lang";

function ListDisplay({ libraryEntry, api }) {
  async function onOpenDetail() {
    await browser.browserAction.openPopup();
    browser.runtime.sendMessage({
      type: MESSAGE_TYPES.SHOW_ANIME_DETAIL,
      payload: {
        libraryEntryId: libraryEntry.id,
      },
    });
  }

  return (
    <CrunchyrollThemeProvider>
      <Box
        css={css`
          margin-top: 16px;
        `}
      >
        <Typography variant="h3">List status</Typography>
        <Box
          css={css`
            margin-top: -4px;
          `}
        >
          <Typography variant="subtitle">{libraryEntry.anime.title}</Typography>
        </Box>
        <Box display="flex" flexDirection="row">
          <Stack paddingTop="16px" flexGrow={1}>
            <Typography>{lang.listStatuses[libraryEntry.status]}</Typography>
            <Progress libraryEntry={libraryEntry} />
            <Rating libraryEntry={libraryEntry} api={api} />
          </Stack>
          <Stack spacing={2} width="200px" paddingLeft="8px">
            <Button
              component="a"
              href={libraryEntry.anime.externalLink}
              target="_blank"
            >
              View on Kitsu
            </Button>
            {browser.browserAction?.openPopup && (
              <Button onClick={onOpenDetail}>Open in Ashidori</Button>
            )}
          </Stack>
        </Box>
      </Box>
    </CrunchyrollThemeProvider>
  );
}
ListDisplay.propTypes = {
  libraryEntry: PropTypes.instanceOf(LibraryEntry).isRequired,
  api: PropTypes.instanceOf(ApiProvider).isRequired,
};

export default ListDisplay;
