import constant from "@utils/constant";
import { toBoolean } from "@utils/lib";

const post = (url, header = {}, body = {}) => {
  const config = createConfig("POST", header, body);
  return fetch(constant.apiHost + url, config);
};

const del = (url, header = {}) => {
  const config = createConfig("DELETE", header);
  return fetch(constant.apiHost + url, config);
};

const put = (url, header = {}, body = {}) => {
  const config = createConfig("PUT", header, body);
  return fetch(constant.apiHost + url, config);
};

const get = (url, header = {}) => {
  const config = createConfig("GET", header);
  return fetch(constant.apiHost + url, config);
};

const createConfig = (method, header, body = {}) => {
  const config = {};
  config.method = method;
  if (toBoolean(header)) config.headers = header;
  if (toBoolean(body)) config.body = JSON.stringify(body);
  return config;
};

const api = {
  post,
  get,
  put,
  del,
};

export default api;
