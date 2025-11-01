import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:8080/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// URLs específicas de la API
export const API_URLS = {
  // Productos
  PRODUCTS: '/products',
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  PRODUCTS_SEARCH: (query: string) => `/products/search?query=${query}`,

  // Usuarios
  USERS: '/users',
  USER_LOGIN: '/users/login',
  USER_REGISTER: '/users/register',
  USER_PROFILE: (id: string) => `/users/${id}`,

  // Pedidos/Órdenes
  ORDERS: '/orders',
  USER_ORDERS: (userId: string) => `/orders/user/${userId}`,
  ORDER_STATUS: (orderId: string) => `/orders/${orderId}/status`
};

// Interfaces para las respuestas de la API
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  user: User;
  orderItems: OrderItem[];
  deliveryDate: string; // ISO date string
  totalAmount: number;
  status: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Funciones de la API
export const apiService = {
  // Productos
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get(API_URLS.PRODUCTS);
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`${API_URLS.PRODUCTS}/${id}`);
    return response.data;
  },

  // Autenticación
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post(API_URLS.USER_LOGIN, credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post(API_URLS.USER_REGISTER, userData);
    return response.data;
  },

  // Usuario
  getUserProfile: async (id: string): Promise<User> => {
    const response = await api.get(API_URLS.USER_PROFILE(id));
    return response.data;
  },

  updateUserProfile: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put(API_URLS.USER_PROFILE(id), userData);
    return response.data;
  },

  // Órdenes
  createOrder: async (orderData: Order): Promise<Order> => {
    const response = await api.post(API_URLS.ORDERS, orderData);
    return response.data;
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`${API_URLS.ORDERS}/${orderId}`);
    return response.data;
  },

  getUserOrders: async (userId: string): Promise<any[]> => {
    const response = await api.get(API_URLS.USER_ORDERS(userId));
    return response.data;
  }
};

export default api;
