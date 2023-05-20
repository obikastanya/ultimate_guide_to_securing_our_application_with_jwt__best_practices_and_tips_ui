import api from "@utils/api";
import auth from "@utils/auth";

const login = (username, password) => {
  const basicAuth = "Basic " + btoa(username + ":" + password);
  const header = { Authorization: basicAuth };
  return api.post("/login", header);
};

const getPermissions = () => {
  const header = { Authorization: "Bearer " + auth.getAccessToken() };
  return api.get("/permissions", header);
};

const logout = () => {
  const header = { Authorization: "Bearer " + auth.getAccessToken() };
  return api.post("/logout", header);
};

const getNewTokens = () => {
  const payload = {
    access_token: auth.getAccessToken(),
    refresh_token: auth.getRefreshToken(),
  };
  const header = {
    "Content-Type": "application/json",
  };
  return api.post("/token/refresh", header, payload);
};


const apis = {
  login,
  getPermissions,
  logout, 
  getNewTokens
};

export default apis;
