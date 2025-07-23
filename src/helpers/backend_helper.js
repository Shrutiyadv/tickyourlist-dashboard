import axios from "axios";
import { del, get, post, postFormData, put, putFormData } from "./api_helper";
import * as url from "./url_helper";

const postRegister = data => post(url.POST_REGISTER, data);
const postVerification = token => post(`${url.POST_EMAIL_VERIFY}?token=${token}`);
const postForgotPassword = data => post(url.POST_RESET_PASSWORD, data);
const postForgotPasswordVerification = (token, data) => post(`${url.POST_RESET_PASSWORD_VERIFY}?token=${token}`, data);
const postLogin = data => post(url.POST_LOGIN, data);
const putJwtProfile = data => put(`${url.PUT_USER_PROFILE}/${data.id}`, data.user);
const getTotalOrdersCountData = () => get(url.GET_ORDERS_COUNT_DATA);
const getTotalRevenueCountData = () => get(url.GET_REVENUE_TOTAL_DATA);
const getOrderTotalAveragePriceApi = () => get(url.GET_ORDERS_AVERAGE_PRICE);
const getCollections = () => get(url.GET_COLLECTIONS);
const addCollection = (formData, config) => postFormData(url.ADD_COLLECTION, formData, config);
const updateCollection = (collection, config) => putFormData(`${url.UPDATE_COLLECTION}${collection.get('_id')}`, collection, config);
const deleteCollection = collectionId => del(`${url.DELETE_COLLECTION}${collectionId}`);
const getProductList = () => get(url.GET_ALL_PRODUCTS_IN_LIST);

export const updateProductInList = product =>
  put(`${url.UPDATE_PRODUCT_IN_LIST}${product._id}`, {
    name: product.name,
    price: product.price,
    category: product.category
  });

export const deleteProductInList = product =>
  del(`${url.DELETE_PRODUCT_IN_LIST}${product._id}`, { headers: { product } });

export const addNewProductInList = product =>
  post(url.ADD_PRODUCT_IN_LIST, product);

const domainAvailabilityApi = siteName =>
  get(`${url.DOMAIN_AVAILABILITY}${siteName}`);

const domainSuggestionApi = siteName =>
  get(`${url.DOMAIN_SUGGESTION}=${siteName}`);

const buyDomainApi = (domain, paymentId) =>
  post(`${url.BUY_DOMAIN}`, {
    domain,
    paymentId,
  });

const onDomainOrderId = (domain, amount) =>
  post(`${url.DOMAIN_ORDERID}`, {
    amount: Math.round(amount) * 100,
    currency: "INR",
    receipt: "01",
    notes: `${domain}`,
  });

export const getOrders = () => get(url.GET_ORDERS);
export const addNewOrder = order => post(`${url.ADD_NEW_ORDER}`, order);

export const updateOrder = order =>
  put(`${url.UPDATE_ORDER}${order._id}`, {
    customerId: order.customerId.value,
    shippingAddress1: order.shippingAddress1,
    shippingAddress2: order.shippingAddress2,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    badgeclass: order.badgeclass,
    city: order.city,
    state: order.state,
    country: order.country,
    phone: order.phone,
    zip: order.zip,
    methodIcon: order.methodIcon,
    orderItems: order.orderItems.map(product => ({
      product: product.product._id,
      quantity: product.quantity,
    })),
  });

export const deleteOrder = order =>
  del(`${url.DELETE_ORDER}${order._id}`, { headers: { order } });

export const deleteAllOrdersCall = () => del(url.DELETE_ALL_ORDER);

export const getCustomers = () => get(url.GET_CUSTOMERS);
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer);

export const updateCustomer = customer =>
  put(`${url.UPDATE_CUSTOMER}${customer._id}`, {
    username: customer.username,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    rating: customer.rating,
    walletBalance: customer.walletBalance,
    joiningDate: customer.joiningDate,
  });

export const deleteCustomer = id =>
  del(`${url.DELETE_CUSTOMER}${id}`);

export const importCustomers = customers =>
  post(url.IMPORT_CUSTOMERS, customers);

export const deleteEveryCustomer = () => del(`${url.DELETE_ALL_CUSTOMERS}`);

export const getInvoices = () => get(url.GET_INVOICES);
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } });

export const deleteAllInvoice = customerId =>
  del(`${url.DELETE_ALL_INVOICE}/${customerId}`);

export const deleteInvoice = (customerId, invoiceId) =>
  del(`${url.DELETE_INVOICE}/${customerId}/customerinvoices/${invoiceId}`);

const getTestimonialsList = () => get(url.GET_TESTIMONIALS);
const addTestimonial = data => post(url.ADD_NEW_TESTIMONIAL, data);
const updateTestimonialData = (userId, data) => put(`${url.UPDATE_TESTIMONIAL}/${userId}`, data);
const deleteTestimonialData = id => del(`${url.DELETE_TESTIMONIAL}/${id}`);
const deleteAllTestimonials = () => del(url.DELETE_ALL_TESTIMONIALS);


export {
  postRegister,
  postVerification,
  postForgotPassword,
  postForgotPasswordVerification,
  postLogin,
  putJwtProfile,
  getTotalOrdersCountData,
  getTotalRevenueCountData,
  getOrderTotalAveragePriceApi,
  getCollections,
  addCollection,
  updateCollection,
  deleteCollection,
  getProductList,
  domainAvailabilityApi,
  domainSuggestionApi,
  buyDomainApi,
  onDomainOrderId,
  getTestimonialsList,
  addTestimonial,
  updateTestimonialData,
  deleteTestimonialData,
  deleteAllTestimonials
};
