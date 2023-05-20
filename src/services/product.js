import api from "@utils/api";
import auth from "@utils/auth";

const getProducts = () => {
  const header = { Authorization: "Bearer " + auth.getAccessToken() };
  return api.get("/products", header);
};

const getProduct = (id) => {
  const header = { Authorization: "Bearer " + auth.getAccessToken() };
  return api.get(`/product/${id}/`, header);
};

const updateProduct = (id, payload) => {
  const header = {
    Authorization: "Bearer " + auth.getAccessToken(),
    "Content-Type": "application/json",
  };
  return api.put(`/product/${id}/`, header, payload);
};

const addProduct = (payload) => {
  const header = {
    Authorization: "Bearer " + auth.getAccessToken(),
    "Content-Type": "application/json",
  };
  return api.post(`/product`, header, payload);
};

const deleteProduct = (id) => {
  const header = { Authorization: "Bearer " + auth.getAccessToken() };
  return api.del(`/product/${id}/`, header);
};

const apis = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
};

export default apis;
