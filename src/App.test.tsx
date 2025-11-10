import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock de hooks y contextos para configuración completa
jest.mock('./hooks/useAuth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
}));

jest.mock('./hooks/useCart', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="cart-provider">{children}</div>,
}));

jest.mock('./components/common/NotificationProvider', () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="notification-provider">{children}</div>,
}));

test('renders App component with full configuration', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Verificar que la aplicación se renderiza con todos los providers
  expect(screen.getByTestId('notification-provider')).toBeTruthy();
  expect(screen.getByTestId('auth-provider')).toBeTruthy();
  expect(screen.getByTestId('cart-provider')).toBeTruthy();
});

test('renders App without crashing', () => {
  expect(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }).not.toThrow();
});
