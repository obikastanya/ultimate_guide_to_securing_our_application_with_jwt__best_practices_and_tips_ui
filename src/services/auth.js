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


const apis = {
  login,
  getPermissions,
  logout
};

export default apis;
