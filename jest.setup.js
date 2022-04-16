import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

global.beforeAll(() => {
  expect.extend(toHaveNoViolations);
});
