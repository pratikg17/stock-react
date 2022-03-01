const urls = new Map();

urls.set("localhost", "http://localhost:5000");
// urls.set("localhost", "https://fastify-node-server.herokuapp.com");
urls.set(
  "stockverse-react.herokuapp.com",
  "https://intel-stock-server.herokuapp.com/"
);

export const baseUrl = urls.get(window.location.hostname);
