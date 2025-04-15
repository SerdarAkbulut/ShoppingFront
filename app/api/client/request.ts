import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7277/api/";

// Axios response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("error interceptor");
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to set headers dynamically
const getHeaders = (mediaType?: string) => {
  let headers = { "Content-Type": "application/json" };

  if (mediaType === "multipart") {
    headers = { "Content-Type": "multipart/form-data" };
  } else if (mediaType === "text") {
    headers = { "Content-Type": "text/plain" };
  } else if (mediaType === "xml") {
    headers = { "Content-Type": "application/xml" };
  }

  return headers;
};

const queries = {
  get: (url: string, mediaType?: string) =>
    axios
      .get(url, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  post: (url: string, body: {}, mediaType?: string) =>
    axios
      .post(url, body, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  put: (url: string, body: {}, mediaType?: string) =>
    axios
      .put(url, body, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  delete: (url: string, mediaType?: string) =>
    axios
      .delete(url, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
};

const Product = {
  list: () => queries.get("products"),
  details: (id: number) => queries.get(`products/${id}`),
  add: (body: any) => queries.post("products", body),
  update: (id: number, body: any) => queries.put(`products/${id}`, body),
  getVariant: () => queries.get("products/product-variant"),
  delete: (id: number) => queries.delete(`products/${id}`),
};

const Cart = {
  get: () => queries.get("cart"),
  addItem: (productId: number, quantity = 1) =>
    queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
  deleteItem: (productId: number, quantity = 1) =>
    queries.delete(`cart?productId=${productId}&quantity=${quantity}`),
};

const User = {
  login: (values: any) => queries.post("account/login", values),
  register: (values: any) => queries.post("account/register", values),
};

const Category = {
  list: () => queries.get("category"),
};

const request = {
  Product,
  Cart,
  User,
  Category,
};
export default request;
