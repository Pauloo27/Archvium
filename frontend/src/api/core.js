import store from "../store";

export function doGuestRequest(route, options) {
  return fetch(process.env.API_URL + route, options);
}

export async function doAuthedRequest(route, options) {
  const authedOptions = { ...(options ?? {}) };
  const fullToken = store.getState().token;

  const token = `${fullToken.prefix} ${fullToken.token}`;
  if (options.headers === undefined) {
    authedOptions.headers = { Authorization: token };
  } else {
    authedOptions.headers.Authorization = token;
  }

  const res = await fetch(process.env.API_URL + route, authedOptions);
  if (res.status === 401) {
    sessionStorage.removeItem("token");
    store.setState({ token: undefined });
    window.location.reload();
  }

  return res;
}
