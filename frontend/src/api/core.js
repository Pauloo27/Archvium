export function doRequest(route, options) {
  return fetch(process.env.API_URL + route, options);
}
