// Mock de axios before importing
jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn()
      }
    }
  };

  return {
    create: jest.fn(() => mockAxiosInstance)
  };
});

import axios from 'axios';
import { apiService, API_URLS } from './api';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockAxiosInstance = mockedAxios.create.mock.results[0]?.value;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Products API', () => {
    it('should get products successfully', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 15.99 },
      ];

      mockAxiosInstance.get.mockResolvedValue({ data: mockProducts });

      const result = await apiService.getProducts();

      expect(result).toEqual(mockProducts);
    });

    it('should get product by id', async () => {
      const mockProduct = { id: 1, name: 'Product 1', price: 10.99 };

      mockAxiosInstance.get.mockResolvedValue({ data: mockProduct });

      const result = await apiService.getProductById(1);

      expect(result).toEqual(mockProduct);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products/1');
    });
  });

  describe('Authentication API', () => {
    it('should login successfully', async () => {
      const mockCredentials = { email: 'test@example.com', password: 'password' };
      const mockResponse = {
        user: { id: '1', name: 'Test User' },
        token: 'mock-token',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await apiService.login(mockCredentials);

      expect(result).toEqual(mockResponse);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(API_URLS.USER_LOGIN, mockCredentials);
    });

    it('should register successfully', async () => {
      const mockUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const mockResponse = {
        user: { id: '1', name: 'Test User' },
        token: 'mock-token',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await apiService.register(mockUserData);

      expect(result).toEqual(mockResponse);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(API_URLS.USER_REGISTER, mockUserData);
    });

    it('should handle login error', async () => {
      const mockCredentials = { email: 'test@example.com', password: 'password' };
      const mockError = new Error('Login failed');

      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(apiService.login(mockCredentials)).rejects.toThrow('Login failed');
    });

    it('should handle register error', async () => {
      const mockUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const mockError = new Error('Registration failed');

      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(apiService.register(mockUserData)).rejects.toThrow('Registration failed');
    });
  });

  describe('User API', () => {
    it('should get user profile', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };

      mockAxiosInstance.get.mockResolvedValue({ data: mockUser });

      const result = await apiService.getUserProfile('1');

      expect(result).toEqual(mockUser);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(API_URLS.USER_PROFILE('1'));
    });

    it('should update user profile', async () => {
      const mockUser = { id: '1', name: 'Updated User', email: 'test@example.com' };
      const updateData = { name: 'Updated User' };

      mockAxiosInstance.put.mockResolvedValue({ data: mockUser });

      const result = await apiService.updateUserProfile('1', updateData);

      expect(result).toEqual(mockUser);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(API_URLS.USER_PROFILE('1'), updateData);
    });
  });

  describe('Orders API', () => {
    it('should create order', async () => {
      const mockOrderData = {
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        orderItems: [],
        deliveryDate: '2024-01-01',
        totalAmount: 100,
        status: 'pending',
      };
      const mockOrder = { ...mockOrderData, id: 1 };

      mockAxiosInstance.post.mockResolvedValue({ data: mockOrder });

      const result = await apiService.createOrder(mockOrderData);

      expect(result).toEqual(mockOrder);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(API_URLS.ORDERS, mockOrderData);
    });

    it('should get order by id', async () => {
      const mockOrder = {
        id: 1,
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        orderItems: [],
        deliveryDate: '2024-01-01',
        totalAmount: 100,
        status: 'pending',
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockOrder });

      const result = await apiService.getOrderById('1');

      expect(result).toEqual(mockOrder);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/orders/1');
    });

    it('should get user orders', async () => {
      const mockOrders = [
        {
          id: 1,
          user: { id: '1', name: 'Test User', email: 'test@example.com' },
          orderItems: [],
          deliveryDate: '2024-01-01',
          totalAmount: 100,
          status: 'pending',
        },
      ];

      mockAxiosInstance.get.mockResolvedValue({ data: mockOrders });

      const result = await apiService.getUserOrders('1');

      expect(result).toEqual(mockOrders);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(API_URLS.USER_ORDERS('1'));
    });
  });

  describe('API URLs', () => {
    it('should have correct API URL constants', () => {
      expect(API_URLS.PRODUCTS).toBe('/products');
      expect(API_URLS.PRODUCTS_BY_CATEGORY('fruits')).toBe('/products/category/fruits');
      expect(API_URLS.PRODUCTS_SEARCH('apple')).toBe('/products/search?query=apple');
      expect(API_URLS.USERS).toBe('/users');
      expect(API_URLS.USER_LOGIN).toBe('/users/login');
      expect(API_URLS.USER_REGISTER).toBe('/users/register');
      expect(API_URLS.USER_PROFILE('1')).toBe('/users/1');
      expect(API_URLS.ORDERS).toBe('/orders');
      expect(API_URLS.USER_ORDERS('1')).toBe('/orders/user/1');
      expect(API_URLS.ORDER_STATUS('1')).toBe('/orders/1/status');
    });
  });

  describe('Axios interceptors', () => {
    it('should add authorization header when token exists', () => {
      const mockToken = 'mock-token';
      const mockConfig = { headers: {} };

      // Mock localStorage
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(mockToken),
        },
        writable: true,
      });

      mockAxiosInstance.interceptors.request.use.mockImplementation((callback: any) => {
        const result = callback(mockConfig);
        expect(result.headers.Authorization).toBe(`Bearer ${mockToken}`);
      });

      // Trigger interceptor setup by importing api
      require('./api');
    });

    it('should not add authorization header when no token exists', () => {
      const mockConfig = { headers: {} };

      // Mock localStorage
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(null),
        },
        writable: true,
      });

      mockAxiosInstance.interceptors.request.use.mockImplementation((callback: any) => {
        const result = callback(mockConfig);
        expect(result.headers.Authorization).toBeUndefined();
      });

      // Trigger interceptor setup by importing api
      require('./api');
    });
  });
});
