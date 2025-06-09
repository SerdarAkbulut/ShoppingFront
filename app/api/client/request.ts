import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5034/api/";

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
  list: (page: number) => queries.get(`products?page=${page}`),
  details: (id: number) => queries.get(`products/${id}`),
  add: (body: any) => queries.post("products", body),
  update: (id: number, body: any) => queries.put(`products/${id}`, body),
  getVariant: () => queries.get("products/product-variant"),
  delete: (id: number) => queries.delete(`products/${id}`),
  getByCategory: (categoryId: number, page: number) =>
    queries.get(`products/category/${categoryId}/${page}`),
  getLastProducts: () => queries.get("products/last"),
  getBySearch: (searchTerm: string) =>
    queries.get(`products/search?q=${searchTerm}`),
  getProductsForAdmin: () => queries.get("products/admin-products"),
  addBestSellers: (productId: number) =>
    queries.post(`products/add-best-sellers/${productId}`, {}),
};

const Cart = {
  get: () => queries.get("cart"),
  addItem: (
    productId: number,
    quantity: number,
    colorId?: number,
    sizeId?: number
  ) =>
    queries.post(
      `cart/add?productId=${productId}&quantity=${quantity}&colorId=${colorId}&sizeId=${sizeId}`,
      {}
    ),
  deleteItem: (productId: number, quantity: number) =>
    queries.delete(
      `cart/deleteItem?productId=${productId}&quantity=${quantity}`
    ),
};

const User = {
  login: (values: any) => queries.post("account/login", values),
  register: (values: any) => queries.post("account/register", values),
};

const Category = {
  list: () => queries.get("category"),
};

const Address = {
  addAddress: (values: any) => queries.post("address", values),
  getAddress: () => queries.get("address"),
};

const Order = {
  createOrder: (values: { adressId: number; orderItems: []; card: [] }) =>
    queries.post("order", values),
  getPrevOrders: () => queries.get("order/getorders"),
  getInstallments: (values: { bin: string; price: string }) =>
    queries.get(`order/installment-options/${values.bin}/${values.price}`),
  getOrderDetails: (id: number) => queries.get(`order/${id}`),
};

const request = {
  Product,
  Cart,
  User,
  Category,
  Address,
  Order,
};
export default request;
