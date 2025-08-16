import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.famelinmodayazici.com.tr/api/";
// axios.defaults.baseURL = "https://localhost:7277/api/";

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
    const anonToken = localStorage.getItem("anonToken");

    if (config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (anonToken) {
        config.headers.Authorization = `Bearer ${anonToken}`;
      }
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
  update: (id: any, body: any) => queries.put(`products/${id}`, body),
  getVariant: () => queries.get("products/product-variant"),
  delete: (id: number) => queries.delete(`products/${id}`),
  getByCategory: (categoryId: number, page: number) =>
    queries.get(`products/category/${categoryId}/${page}`),
  getLastProducts: () => queries.get("products/last"),
  getBySearch: (searchTerm: string, page: number) =>
    queries.get(`products/search/${page}?q=${searchTerm}`),
  getProductsForAdmin: () => queries.get("products/admin-products"),
  addBestSellers: (productId: number) =>
    queries.post(`products/add-best-sellers/${productId}`, {}),
  getBestSellers: () => queries.get("products/home"),
  addDiscount: (productId: number, discount: string) =>
    queries.put(`products/add-discount/${productId}/${discount}`, {}),
  deleteDiscount: (productId: number) =>
    queries.delete(`products/delete-discount/${productId}`),
  getColors: () => queries.get("products/get-color"),
  getSizes: () => queries.get("products/get-size"),
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
  deleteItem: (
    productId: number,
    quantity: number,
    colorId: number,
    sizeId: number
  ) =>
    queries.delete(
      `cart/deleteItem?productId=${productId}&quantity=${quantity}&colorId=${colorId}&sizeId=${sizeId}`
    ),
};

const Slider = {
  getSliders: () => queries.get("/slider"),
  addSlider: (Images: any) => queries.post("slider/add-item", { Images }),
  deleteSlider: (id: any) => queries.delete(`slider/${id}`),
};

const User = {
  login: (values: any) => queries.post("account/login", values),
  register: (values: any) => queries.post("account/register", values),
  getUserDetails: () => queries.get("user/details"),
  updateUserDetails: (values: any) => queries.put("user/update", values),
  forgotPassword: (values: any) => queries.post("user/forgot-password", values),
  checkToken: (email: string, token: string) =>
    queries.get(`user/check-token?email=${email}&token=${token}`),
  ResetPassword: (values: any) => queries.post("user/reset-password", values),
  getUserLogin: () => queries.get(`user`),
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
  createAnonOrder: (values: any) => queries.post("order/anon-order", values),
};

const request = {
  Product,
  Cart,
  User,
  Category,
  Address,
  Order,
  Slider,
};
export default request;
