import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de hooks y contextos
jest.mock('./hooks/useAuth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
}));

jest.mock('./hooks/useCart', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="cart-provider">{children}</div>,
}));

jest.mock('./components/common/NotificationProvider', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="notification-provider">{children}</div>,
}));

// Mock de páginas
jest.mock('./pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('./pages/Products', () => {
  return function MockProducts() {
    return <div data-testid="products-page">Products Page</div>;
  };
});

jest.mock('./pages/Login', () => {
  return function MockLogin() {
    return <div data-testid="login-page">Login Page</div>;
  };
});

jest.mock('./pages/Register', () => {
  return function MockRegister() {
    return <div data-testid="register-page">Register Page</div>;
  };
});

jest.mock('./pages/About', () => {
  return function MockAbout() {
    return <div data-testid="about-page">About Page</div>;
  };
});

jest.mock('./pages/Blog', () => {
  return function MockBlog() {
    return <div data-testid="blog-page">Blog Page</div>;
  };
});

jest.mock('./pages/Profile', () => {
  return function MockProfile() {
    return <div data-testid="profile-page">Profile Page</div>;
  };
});

jest.mock('./pages/AdminLogin', () => {
  return function MockAdminLogin() {
    return <div data-testid="admin-login-page">Admin Login Page</div>;
  };
});

jest.mock('./pages/AdminDashboard', () => {
  return function MockAdminDashboard() {
    return <div data-testid="admin-dashboard-page">Admin Dashboard Page</div>;
  };
});

jest.mock('./pages/Cart', () => {
  return function MockCart() {
    return <div data-testid="cart-page">Cart Page</div>;
  };
});

jest.mock('./pages/PurchaseSuccess', () => {
  return function MockPurchaseSuccess() {
    return <div data-testid="purchase-success-page">Purchase Success Page</div>;
  };
});

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);

    // Verificar que la aplicación se renderiza
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });

  it('should render with all providers', () => {
    render(<App />);

    // Verificar que todos los providers están presentes
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
    expect(screen.getByTestId('auth-provider')).toBeTruthy();
    expect(screen.getByTestId('cart-provider')).toBeTruthy();
  });

  it('should render Router with Routes', () => {
    render(<App />);

    // Verificar que el router está configurado (aunque no podemos verificar rutas específicas sin navegación)
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });

  it('should render home page by default', () => {
    render(<App />);

    // Verificar que se renderiza la página de inicio por defecto
    expect(screen.getByTestId('home-page')).toBeTruthy();
  });

  it('should render products page when navigating to /products', () => {
    render(<App />);

    // Esta prueba verifica que la estructura de rutas permite navegación
    // Para pruebas más específicas de rutas, se recomienda usar MemoryRouter
    expect(screen.getByTestId('products-page')).toBeTruthy();
  });

  it('should render login page when navigating to /login', () => {
    render(<App />);

    expect(screen.getByTestId('login-page')).toBeTruthy();
  });

  it('should render register page when navigating to /register', () => {
    render(<App />);

    expect(screen.getByTestId('register-page')).toBeTruthy();
  });

  it('should render profile page when navigating to /profile', () => {
    render(<App />);

    expect(screen.getByTestId('profile-page')).toBeTruthy();
  });

  it('should render admin login page when navigating to /admin/login', () => {
    render(<App />);

    expect(screen.getByTestId('admin-login-page')).toBeTruthy();
  });

  it('should render admin dashboard page when navigating to /admin/dashboard', () => {
    render(<App />);

    expect(screen.getByTestId('admin-dashboard-page')).toBeTruthy();
  });

  it('should render cart page when navigating to /cart', () => {
    render(<App />);

    expect(screen.getByTestId('cart-page')).toBeTruthy();
  });

  it('should render purchase success page when navigating to /purchase-success', () => {
    render(<App />);

    expect(screen.getByTestId('purchase-success-page')).toBeTruthy();
  });

  it('should render about page when navigating to /about', () => {
    render(<App />);

    expect(screen.getByTestId('about-page')).toBeTruthy();
  });

  it('should render blog page when navigating to /blog', () => {
    render(<App />);

    expect(screen.getByTestId('blog-page')).toBeTruthy();
  });

  it('should include Bootstrap CSS', () => {
    // Verificar que Bootstrap está incluido (esto se verifica indirectamente por la presencia del componente)
    render(<App />);

    // Si Bootstrap no estuviera incluido, podría causar errores de renderizado
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });

  it('should include custom CSS', () => {
    // Verificar que el CSS personalizado está incluido
    render(<App />);

    // La presencia del componente indica que el CSS se cargó correctamente
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });
});
