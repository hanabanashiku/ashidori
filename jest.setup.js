import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

global.beforeAll(() => {
  expect.extend(toHaveNoViolations);

  browser.scripting = {
    executeScript: jest.fn(),
  };
  browser.tabs.executeScript = jest.fn();
  browser.notifications.onButtonClicked.removeListener = jest.fn();
  browser.notifications.onClicked.removeListener = jest.fn();
  browser.runtime = {
    ...browser.runtime,
    getManifest: jest.fn(),
    getURL: jest.fn(),
  };
  browser.identity = {
    getRedirectURL: jest.fn(
      () => "https://chiejjofmfnepjchjenapocjafpkipaj.chromiumapp.org/"
    ),
    launchWebAuthFlow: jest.fn(() => Promise.resolve()),
  };
});
