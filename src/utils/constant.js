const apiHost = "http://localhost:8080";
const AUTH_TOKEN_REFRESH = "AUTH_TOKEN_REFRESH";
const AUTH_TOKEN_ACCESS = "AUTH_TOKEN_ACCESS";
const REFRESH_TOKEN_INTERVAL = 30 *60  * 1000; // every 10 minutes
const REALTIME_WATCH_TOKEN_INTERVAL = 1 *60  * 1000; // every 5 minutes


const constant = {
  apiHost,
  AUTH_TOKEN_REFRESH,
  AUTH_TOKEN_ACCESS,
  REFRESH_TOKEN_INTERVAL,
  REALTIME_WATCH_TOKEN_INTERVAL
};

export default constant;
