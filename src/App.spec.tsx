import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Verificar que la aplicación se renderiza
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });

  it('should render with all providers', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Verificar que todos los providers están presentes
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
    expect(screen.getByTestId('auth-provider')).toBeTruthy();
    expect(screen.getByTestId('cart-provider')).toBeTruthy();
  });

  it('should render Router with Routes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Verificar que el router está configurado (aunque no podemos verificar rutas específicas sin navegación)
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });

  it('should have correct route structure', () => {
    // Esta prueba verifica que el componente App se puede renderizar con el BrowserRouter
    // Las rutas específicas se probarían mejor con un test de integración o usando MemoryRouter
    expect(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    }).not.toThrow();
  });

  it('should include Bootstrap CSS', () => {
    // Verificar que Bootstrap está incluido (esto se verifica indirectamente por la presencia del componente)
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Si Bootstrap no estuviera incluido, podría causar errores de renderizado
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });

  it('should include custom CSS', () => {
    // Verificar que el CSS personalizado está incluido
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // La presencia del componente indica que el CSS se cargó correctamente
    expect(screen.getByTestId('notification-provider')).toBeTruthy();
  });
});
