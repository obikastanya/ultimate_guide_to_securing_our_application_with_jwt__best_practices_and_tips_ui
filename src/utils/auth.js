import cookie from "./cookie";
import constant from "./constant";
import { SHA256 } from "crypto-js";

const storeCredential = (credential) => {
  let refreshTokenPayload = credential.refresh_token.split(".")[1];
  let accessTokenPayload = credential.access_token.split(".")[1];

  refreshTokenPayload = _decodeTokenPayload(refreshTokenPayload);
  accessTokenPayload = _decodeTokenPayload(accessTokenPayload);

  const userId = refreshTokenPayload.user_id;
  const roleId = refreshTokenPayload.role_id;

  // expiration in miliseconds
  // expiredAt refers to access token expiration
  // set cookie expiration equal to refresh token expiration to support token renewals

  const refreshTokenExpiration = new Date(
    refreshTokenPayload.exp * 1000
  ).toUTCString();
  const accessTokenExpiration = new Date(
    accessTokenPayload.exp * 1000
  ).toUTCString();

  const refreshTokenKey = _generateUniqueTokenKey(
    constant.AUTH_TOKEN_REFRESH + userId
  );
  const accessTokenKey = _generateUniqueTokenKey(
    constant.AUTH_TOKEN_ACCESS + userId
  );

  cookie.push("userId", userId, refreshTokenExpiration);
  cookie.push("roleId", roleId, refreshTokenExpiration);
  cookie.push("expiredAt", accessTokenExpiration, refreshTokenExpiration);
  cookie.push(
    refreshTokenKey,
    credential.refresh_token,
    refreshTokenExpiration
  );
  cookie.push(accessTokenKey, credential.access_token, refreshTokenExpiration);
};

const storePermissions = (permissions) => {
  const permissionsObj = {};
  for (let permission of permissions) permissionsObj[permission] = 1;
  localStorage.setItem("permissions", JSON.stringify(permissionsObj));
};

const removeCredential = () => {
  const userId = cookie.get("userId");

  const refreshTokenKey = _generateUniqueTokenKey(
    constant.AUTH_TOKEN_REFRESH + userId
  );
  const accessTokenKey = _generateUniqueTokenKey(
    constant.AUTH_TOKEN_ACCESS + userId
  );

  cookie.remove("userId");
  cookie.remove("roleId");
  cookie.remove("expiredAt");
  cookie.remove(refreshTokenKey);
  cookie.remove(accessTokenKey);
};

const removePermissions = () => {
  localStorage.removeItem("permissions");
};

const getAccessToken = () => {
  const userId = cookie.get("userId");
  const key = _generateUniqueTokenKey(constant.AUTH_TOKEN_ACCESS + userId);
  return cookie.get(key);
};

const getRefreshToken = () => {
  const userId = cookie.get("userId");
  const key = _generateUniqueTokenKey(constant.AUTH_TOKEN_REFRESH + userId);
  return cookie.get(key);
};

const hasPermission = (permissionName) => {
  const permissions = getPermissions();
  try {
    const permission = permissions[permissionName];
    return Boolean(permission);
  } catch (err) {
    return false;
  }
};

const getExpiration = () => cookie.get("expiredAt");

const getPermissions = () => {
  let permissions = localStorage.getItem("permissions");
  if (!permissions) return {};
  return JSON.parse(permissions);
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
  getAccessToken,
  getExpiration,
  hasPermission,
  removeCredential,
  removePermissions,
  getRefreshToken,
};
export default auth;
