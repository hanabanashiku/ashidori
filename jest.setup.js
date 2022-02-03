import chrome from "sinon-chrome";
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

global.beforeAll(() => {
  chrome.runtime.id = "testid";
  global.chrome = chrome;
  expect.extend(toHaveNoViolations);
});

global.afterAll(() => {
  global.chrome = undefined;
});
