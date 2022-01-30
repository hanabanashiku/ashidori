import chrome from "sinon-chrome";
import "@testing-library/jest-dom";

global.beforeAll(() => {
  chrome.runtime.id = "testid";
  global.chrome = chrome;
});

global.afterAll(() => {
  global.chrome = undefined;
});
