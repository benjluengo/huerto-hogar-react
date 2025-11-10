import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Profile from './Profile';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../components/common/NotificationProvider';

// Mock de hooks
jest.mock('../hooks/useAuth');
jest.mock('../components/common/NotificationProvider');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseNotification = useNotification as jest.MockedFunction<typeof useNotification>;

describe('Profile Component', () => {
  const mockShowNotification = jest.fn();
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNotification.mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const renderProfile = (authState: any) => {
    mockUseAuth.mockReturnValue(authState);

    return render(<Profile />);
  };

  describe('Unauthenticated user', () => {
    it('should show access denied message when user is not authenticated', () => {
      renderProfile({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        updateProfile: jest.fn(),
      });

      expect(screen.getByText('Acceso Denegado')).toBeTruthy();
      expect(screen.getByText('Debes iniciar sesión para acceder a tu perfil.')).toBeTruthy();
      expect(mockShowNotification).toHaveBeenCalledWith(
        'Debes iniciar sesión para ver tu perfil.',
        'error'
      );
    });
  });

  describe('Authenticated user', () => {
    const mockUser = {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phoneNumber: '+1234567890',
      address: 'Calle Principal 123',
      role: 'user',
    };

    const defaultAuthState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      updateProfile: jest.fn(),
    };

    it('should render profile information correctly', () => {
      renderProfile(defaultAuthState);

      expect(screen.getByText('Mi Perfil')).toBeTruthy();
      expect(screen.getByText('Juan Pérez')).toBeTruthy();
      expect(screen.getByText('juan@example.com')).toBeTruthy();
      expect(screen.getByText('+1234567890')).toBeTruthy();
      expect(screen.getByText('Calle Principal 123')).toBeTruthy();
      expect(screen.getByText('user')).toBeTruthy();
    });

    it('should show loading spinner when loading', () => {
      renderProfile({
        ...defaultAuthState,
        isLoading: true,
      });

      expect(screen.getByText('Cargando perfil...')).toBeTruthy();
    });

    it('should show error message when user data is null', () => {
      renderProfile({
        ...defaultAuthState,
        user: null,
      });

      expect(screen.getByText('Error')).toBeTruthy();
      expect(screen.getByText('No se pudo cargar la información del perfil.')).toBeTruthy();
    });

    describe('Edit mode', () => {
      it('should toggle to edit mode when edit button is clicked', () => {
        renderProfile(defaultAuthState);

        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        expect(screen.getByDisplayValue('Juan Pérez')).toBeTruthy();
        expect(screen.getByDisplayValue('juan@example.com')).toBeTruthy();
        expect(screen.getByDisplayValue('+1234567890')).toBeTruthy();
        expect(screen.getByDisplayValue('Calle Principal 123')).toBeTruthy();
      });

      it('should cancel edit mode when cancel button is clicked', () => {
        renderProfile(defaultAuthState);

        // Enter edit mode
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Cancel edit - find the cancel button in the form (outline-secondary variant)
        const cancelButtons = screen.getAllByRole('button', { name: /cancelar/i });
        const cancelButton = cancelButtons.find(button => button.classList.contains('btn-outline-secondary'));
        if (!cancelButton) throw new Error('Cancel button not found');
        fireEvent.click(cancelButton);

        // Should be back to view mode
        expect(screen.getByText('Juan Pérez')).toBeTruthy();
        expect(screen.getByText('Editar')).toBeTruthy();
      });

      it('should validate form fields', async () => {
        renderProfile(defaultAuthState);

        // Enter edit mode
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Clear required fields
        const nameInput = screen.getByDisplayValue('Juan Pérez');
        const emailInput = screen.getByDisplayValue('juan@example.com');
        const phoneInput = screen.getByDisplayValue('+1234567890');
        const addressInput = screen.getByDisplayValue('Calle Principal 123');

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(phoneInput, { target: { value: '' } });
        fireEvent.change(addressInput, { target: { value: '' } });

        // Try to save
        const saveButton = screen.getByText('Guardar Cambios');
        fireEvent.click(saveButton);

        // Should show validation errors
        await waitFor(() => {
          expect(screen.getByText('El nombre es requerido')).toBeTruthy();
          expect(screen.getByText('El correo electrónico es requerido')).toBeTruthy();
          expect(screen.getByText('El teléfono es requerido')).toBeTruthy();
          expect(screen.getByText('La dirección es requerida')).toBeTruthy();
        });
      });

      it('should validate email format', async () => {
        renderProfile(defaultAuthState);

        // Enter edit mode
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Enter invalid email
        const emailInput = screen.getByDisplayValue('juan@example.com');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        // Try to save
        const saveButton = screen.getByText('Guardar Cambios');
        fireEvent.click(saveButton);

        // Should show email validation error
        await waitFor(() => {
          expect(screen.getByText('El correo electrónico no es válido')).toBeTruthy();
        });
      });

      it('should save profile changes successfully', async () => {
        const mockUpdateProfile = jest.fn().mockResolvedValue({
          ...mockUser,
          name: 'Juan Pérez Actualizado',
        });

        renderProfile({
          ...defaultAuthState,
          updateProfile: mockUpdateProfile,
        });

        // Enter edit mode
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Change name
        const nameInput = screen.getByDisplayValue('Juan Pérez');
        fireEvent.change(nameInput, { target: { value: 'Juan Pérez Actualizado' } });

        // Save changes
        const saveButton = screen.getByText('Guardar Cambios');
        fireEvent.click(saveButton);

        await waitFor(() => {
          expect(mockUpdateProfile).toHaveBeenCalledWith({
            name: 'Juan Pérez Actualizado',
            email: 'juan@example.com',
            phoneNumber: '+1234567890',
            address: 'Calle Principal 123',
          });
          expect(mockShowNotification).toHaveBeenCalledWith(
            'Perfil actualizado exitosamente',
            'success'
          );
        });
      });

      it('should handle save profile error', async () => {
        const mockUpdateProfile = jest.fn().mockRejectedValue(new Error('Update failed'));

        renderProfile({
          ...defaultAuthState,
          updateProfile: mockUpdateProfile,
        });

        // Enter edit mode
        const editButton = screen.getByText('Editar');
        fireEvent.click(editButton);

        // Save changes
        const saveButton = screen.getByText('Guardar Cambios');
        fireEvent.click(saveButton);

        await waitFor(() => {
          expect(mockUpdateProfile).toHaveBeenCalled();
          expect(mockShowNotification).toHaveBeenCalledWith(
            'Error al actualizar el perfil. El correo electrónico podría estar en uso.',
            'error'
          );
        });
      });
    });

    describe('Navigation tabs', () => {
      it('should render navigation tabs', () => {
        renderProfile(defaultAuthState);

        expect(screen.getByText('Inicio')).toBeTruthy();
        expect(screen.getByText('Productos')).toBeTruthy();
        expect(screen.getByText('Carrito')).toBeTruthy();
        expect(screen.getByText('Nosotros')).toBeTruthy();
        expect(screen.getByText('Blog')).toBeTruthy();
      });
    });
  });
});
