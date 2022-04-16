import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

global.beforeAll(() => {
  expect.extend(toHaveNoViolations);

  browser.scripting = {
    executeScript: jest.fn(),
  };
});
