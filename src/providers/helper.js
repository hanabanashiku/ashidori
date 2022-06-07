export function getHttpAdapter() {
  if (process.env.NODE_ENV !== "test" && typeof window === "undefined") {
    // this adapter allows us to use axios in a service worker context
    // Unfortunately it doesn't work in node
    return require("@vespaiach/axios-fetch-adapter").default;
  }
  return undefined;
}
