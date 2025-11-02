import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth, AuthProvider } from './useAuth';
import { apiService } from '../services/api';

// Mock del apiService
jest.mock('../services/api', () => ({
  apiService: {
    login: jest.fn(),
    register: jest.fn(),
    updateUserProfile: jest.fn(),
  },
}));

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useAuth Hook', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('Initial state', () => {
    it('should return initial state with no user', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should load user from localStorage on mount', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return 'mock-token';
        if (key === 'huertohogar_currentUser') return JSON.stringify(mockUser);
        return null;
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return 'mock-token';
        if (key === 'huertohogar_currentUser') return 'invalid-json';
        return null;
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('Error parsing saved user:', expect.any(SyntaxError));

      consoleSpy.mockRestore();
    });
  });

  describe('login', () => {
    it('should login successfully and update state', async () => {
      const mockCredentials = { email: 'test@example.com', password: 'password' };
      const mockResponse = {
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        token: 'mock-token',
      };

      (apiService.login as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login(mockCredentials);
      });

      expect(apiService.login).toHaveBeenCalledWith(mockCredentials);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'mock-token');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'huertohogar_currentUser',
        JSON.stringify(mockResponse.user)
      );
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle login error', async () => {
      const mockCredentials = { email: 'test@example.com', password: 'password' };
      const mockError = new Error('Login failed');

      (apiService.login as jest.Mock).mockRejectedValue(mockError);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(async () => {
        await act(async () => {
          await result.current.login(mockCredentials);
        });
      }).rejects.toThrow('Login failed');

      expect(consoleSpy).toHaveBeenCalledWith('Login error:', mockError);
      consoleSpy.mockRestore();
    });
  });

  describe('register', () => {
    it('should register successfully and update state', async () => {
      const mockUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const mockResponse = {
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        token: 'mock-token',
      };

      (apiService.register as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.register(mockUserData);
      });

      expect(apiService.register).toHaveBeenCalledWith(mockUserData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'mock-token');
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'huertohogar_currentUser',
        JSON.stringify(mockResponse.user)
      );
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle register error', async () => {
      const mockUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      const mockError = new Error('Registration failed');

      (apiService.register as jest.Mock).mockRejectedValue(mockError);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(async () => {
        await act(async () => {
          await result.current.register(mockUserData);
        });
      }).rejects.toThrow('Registration failed');

      expect(consoleSpy).toHaveBeenCalledWith('Register error:', mockError);
      consoleSpy.mockRestore();
    });
  });

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      const mockUpdatedUser = { ...mockUser, name: 'Updated Name' };
      const updateData = { name: 'Updated Name' };

      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return 'mock-token';
        if (key === 'huertohogar_currentUser') return JSON.stringify(mockUser);
        return null;
      });

      (apiService.updateUserProfile as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const { result } = renderHook(() => useAuth(), { wrapper });

      let updatedUser: any;
      await act(async () => {
        updatedUser = await result.current.updateProfile(updateData);
      });

      expect(apiService.updateUserProfile).toHaveBeenCalledWith('1', updateData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'huertohogar_currentUser',
        JSON.stringify(mockUpdatedUser)
      );
      expect(result.current.user).toEqual(mockUpdatedUser);
      expect(updatedUser).toEqual(mockUpdatedUser);
    });

    it('should throw error when no user is logged in', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(async () => {
        await act(async () => {
          await result.current.updateProfile({ name: 'Test' });
        });
      }).rejects.toThrow('No user logged in');
    });

    it('should handle update profile error', async () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      const mockError = new Error('Update failed');

      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return 'mock-token';
        if (key === 'huertohogar_currentUser') return JSON.stringify(mockUser);
        return null;
      });

      (apiService.updateUserProfile as jest.Mock).mockRejectedValue(mockError);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(async () => {
        await act(async () => {
          await result.current.updateProfile({ name: 'Updated Name' });
        });
      }).rejects.toThrow('Update failed');

      expect(consoleSpy).toHaveBeenCalledWith('Update profile error:', mockError);
      consoleSpy.mockRestore();
    });
  });

  describe('logout', () => {
    it('should clear user data and localStorage', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };

      localStorageMock.getItem.mockImplementation((key: string) => {
        if (key === 'auth_token') return 'mock-token';
        if (key === 'huertohogar_currentUser') return JSON.stringify(mockUser);
        return null;
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.logout();
      });

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('huertohogar_currentUser');
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('useAuth hook outside provider', () => {
    it('should throw error when used outside AuthProvider', () => {
      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');
    });
  });
});
