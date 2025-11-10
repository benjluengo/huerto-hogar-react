const axios = {
  get: jest.fn((url) => {
    // Mock responses based on URL
    if (url.includes('/products')) {
      return Promise.resolve({
        data: [
          {
            id: 1,
            name: 'Producto 1',
            price: 10.99,
            image: 'image1.jpg',
            category: 'Frutas',
            stock: 50,
            description: 'Descripción del producto 1'
          },
          {
            id: 2,
            name: 'Producto 2',
            price: 15.99,
            image: 'image2.jpg',
            category: 'Verduras',
            stock: 30,
            description: 'Descripción del producto 2'
          }
        ]
      });
    }
    if (url.includes('/users/')) {
      return Promise.resolve({
        data: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          phoneNumber: '+1234567890',
          address: 'Test Address',
          role: 'user'
        }
      });
    }
    // Default response
    return Promise.resolve({ data: {} });
  }),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  patch: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => axios),
  defaults: {
    baseURL: '',
    headers: {
      common: {},
      get: {},
      post: {},
      put: {},
      patch: {},
      delete: {},
    },
  },
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
    },
    response: {
      use: jest.fn(),
      eject: jest.fn(),
    },
  },
};

module.exports = axios;
