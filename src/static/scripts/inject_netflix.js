const api = window.netflix.reactContext.models.services.data.memberapi,
  baseUrl = api.protocol + "://" + api.hostname + api.path[0],
  input = document.createElement("input");
input.setAttribute("type", "hidden"),
  input.setAttribute("name", "ashidori-observer"),
  input.setAttribute("value", baseUrl),
  document.body.appendChild(input);
