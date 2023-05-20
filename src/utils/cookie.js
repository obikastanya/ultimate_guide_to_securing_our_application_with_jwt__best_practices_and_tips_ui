/**
 * param =>(
 * cookieName:string -> names for the cookie.
 * value:string -> cookie values.
 * secure:boolean -> cookie must be send through https.
 * expiredAt:int -> cookie will be removed after they expired.
 * sameSite:string -> prevent cros site request.
 * )
 * */
const push = (
  cookieName,
  value,
  expiredAt = null,
  secure = true,
  sameSite = "Strict"
) => {
  let cookie_component = [];
  
  cookie_component.push(`${cookieName}=${value}`);

  if (secure) cookie_component.push("secure");
  if (expiredAt) cookie_component.push(`expires=${expiredAt}`);
  if (sameSite) cookie_component.push(`SameSite=${sameSite}`);

  document.cookie = cookie_component.join(";");
};

const remove = (cookieName) => {
  // set cookie expires to the past, so it will automatically expired.
  let expiredDate = new Date("1970-01-01");
  expiredDate = expiredDate.toUTCString();
  document.cookie = `${cookieName}=${null};expires=${expiredDate}`;
};

const get = (cookieName) => {
  let cookies = parseCookies();
  if (!cookies) return null;
  for (let cookie of cookies) {
    let value = cookie[`${cookieName}`];
    if (value) return value;
  }
};

const parseCookies = () => {
  let raw_cookies = document.cookie.split(";");
  if (!raw_cookies) return [];

  let cookies = [];
  for (let cookie of raw_cookies) {
    let [key, value] = cookie.split("=");

    key = key.trim(); // remove whitespace

    let cookieObj = {};
    cookieObj[key] = value;

    cookies.push(cookieObj);
  }
  return cookies;
};

const cookie = {
  push,
  get,
  remove,
};

export default cookie;
