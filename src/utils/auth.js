import cookie from "./cookie";
import constant from "./constant";
import { SHA256 } from "crypto-js";

const storeCredential = (credential) => {
  let refreshTokenPayload = credential.refresh_token.split(".")[1];
  refreshTokenPayload = _decodeTokenPayload(refreshTokenPayload);

  const userId = refreshTokenPayload.user_id;
  const roleId = refreshTokenPayload.role_id;

  // expiration in miliseconds
  const expiredAt = new Date(refreshTokenPayload.exp * 1000).toUTCString();

  const refreshTokenKey = _generateUniqueTokenKey(
    constant.AUTH_TOKEN_REFRESH + userId
  );
  const accessTokenKey = _generateUniqueTokenKey(
    constant.AUTH_TOKEN_ACCESS + userId
  );

  cookie.push("userId", userId, expiredAt);
  cookie.push("roleId", roleId, expiredAt);
  cookie.push("expiredAt", expiredAt, expiredAt);
  cookie.push(refreshTokenKey, credential.refresh_token, expiredAt);
  cookie.push(accessTokenKey, credential.access_token, expiredAt);
};

const storePermissions = (permissions) => {
  const permissionsObj = {};
  for (let permission of permissions) permissionsObj[permission] = 1;
  localStorage.setItem("permissions", JSON.stringify(permissionsObj));
};

const getAccessToken = () => {
  const userId = cookie.get("userId");
  const key = _generateUniqueTokenKey(constant.AUTH_TOKEN_ACCESS + userId);
  return cookie.get(key);
};

const _decodeTokenPayload = (encodedPayload) => {
  const data = atob(encodedPayload);
  return JSON.parse(data);
};

const _generateUniqueTokenKey = (value) => {
  return SHA256(value).toString();
};

const auth = {
  storeCredential,
  storePermissions,
  getAccessToken
};
export default auth;
