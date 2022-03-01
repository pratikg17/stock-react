const urls = new Map();
const webSocketUrls = new Map();

urls.set("localhost", "http://localhost:5000");

urls.set(
  "stockverse-react.herokuapp.com",
  "https://intel-stock-server.herokuapp.com/"
);
webSocketUrls.set("localhost", "ws://localhost:5000");

webSocketUrls.set(
  "stockverse-react.herokuapp.com",
  "wss://intel-stock-server.herokuapp.com/"
);

export const baseUrl = urls.get(window.location.hostname);
export const webSocketUrl = webSocketUrls.get(window.location.hostname);
