import NodeEnvironment from "jest-environment-node";
import chrome from "sinon-chrome";

export default class TestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
  }

  async setup() {
    await super.setup();
    this.global.chrome = chrome;
    chrome.runtime.id = "testid";
  }

  async teardown() {
    await super.teardown();
    this.global.chrome = undefined;
  }

  getVmContext() {
    return super.getVmContext();
  }
}
