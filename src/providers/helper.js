/* istanbul ignore next */
export function getHttpAdapter() {
  if (process.env.NODE_ENV !== "test" && typeof window === "undefined") {
    // this adapter allows us to use axios in a service worker context
    // Unfortunately it doesn't work in node
    return require("@vespaiach/axios-fetch-adapter").default;
  }
  return undefined;
}

export function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
