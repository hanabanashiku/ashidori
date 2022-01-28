import chrome from 'sinon-chrome';

global.beforeAll(() => {
    chrome.runtime.id = "testid";
    global.chrome = chrome;
});

global.afterAll(() => {
    global.chrome = undefined;
});