export function returnToOptions(navigate) {
  navigate("/" + window.location.pathname.split("/").slice(-3)[0]);
}
