import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import ProductFilters from './ProductFilters';
import { useProducts } from '../../hooks/useProducts';
import { AuthProvider } from '../../hooks/useAuth';
import { CartProvider } from '../../hooks/useCart';
import { NotificationProvider } from '../common/NotificationProvider';

// Mock del hook useProducts
jest.mock('../../hooks/useProducts');

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NotificationProvider>
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  </NotificationProvider>
);

describe('ProductFilters Component', () => {
  const mockSetSearchTerm = jest.fn();
  const mockSetSelectedCategory = jest.fn();
  const mockSetPriceRange = jest.fn();
  const mockSetStockFilter = jest.fn();
  const mockSetSortBy = jest.fn();
  const mockClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      selectedCategory: '',
      setSelectedCategory: mockSetSelectedCategory,
      priceRange: '',
      setPriceRange: mockSetPriceRange,
      stockFilter: '',
      setStockFilter: mockSetStockFilter,
      sortBy: 'name-asc',
      setSortBy: mockSetSortBy,
      clearFilters: mockClearFilters,
      refreshProducts: jest.fn(),
    });
  });

  it('should render all filter controls', () => {
    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Buscar productos...')).toBeTruthy();
    expect(screen.getByText('Categoría')).toBeTruthy();
    expect(screen.getByText('Rango de precio')).toBeTruthy();
    expect(screen.getByText('Disponibilidad')).toBeTruthy();
    expect(screen.getByText('Ordenar por')).toBeTruthy();
    expect(screen.getByText('Limpiar filtros')).toBeTruthy();
  });

  it('should call setSearchTerm when search input changes', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <ProductFilters />
        </TestWrapper>
      );
    });

    const searchInput = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(searchInput, { target: { value: 'manzana' } });

    await waitFor(() => {
      expect(mockSetSearchTerm).toHaveBeenCalledWith('manzana');
    });
  });

  it('should call setSelectedCategory when category select changes', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <ProductFilters />
        </TestWrapper>
      );
    });

    const categorySelect = screen.getByDisplayValue('Todas las categorías');
    fireEvent.change(categorySelect, { target: { value: 'Frutas' } });

    await waitFor(() => {
      expect(mockSetSelectedCategory).toHaveBeenCalledWith('Frutas');
    });
  });

  it('should call setPriceRange when price select changes', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <ProductFilters />
        </TestWrapper>
      );
    });

    const priceSelect = screen.getByDisplayValue('Todos los precios');
    fireEvent.change(priceSelect, { target: { value: '0-1000' } });

    await waitFor(() => {
      expect(mockSetPriceRange).toHaveBeenCalledWith('0-1000');
    });
  });

  it('should call setStockFilter when stock select changes', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <ProductFilters />
        </TestWrapper>
      );
    });

    const stockSelect = screen.getByDisplayValue('Todos');
    fireEvent.change(stockSelect, { target: { value: 'available' } });

    await waitFor(() => {
      expect(mockSetStockFilter).toHaveBeenCalledWith('available');
    });
  });

  it('should call setSortBy when sort select changes', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <ProductFilters />
        </TestWrapper>
      );
    });

    const sortSelect = screen.getByDisplayValue('Nombre (A-Z)');
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    await waitFor(() => {
      expect(mockSetSortBy).toHaveBeenCalledWith('price-asc');
    });
  });

  it('should call clearFilters when clear button is clicked', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <ProductFilters />
        </TestWrapper>
      );
    });

    const clearButton = screen.getByText('Limpiar filtros');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(mockClearFilters).toHaveBeenCalled();
    });
  });

  it('should display current filter values', () => {
    mockUseProducts.mockReturnValue({
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
      searchTerm: 'manzana',
      setSearchTerm: mockSetSearchTerm,
      selectedCategory: 'Frutas',
      setSelectedCategory: mockSetSelectedCategory,
      priceRange: '0-1000',
      setPriceRange: mockSetPriceRange,
      stockFilter: 'available',
      setStockFilter: mockSetStockFilter,
      sortBy: 'price-desc',
      setSortBy: mockSetSortBy,
      clearFilters: mockClearFilters,
      refreshProducts: jest.fn(),
    });

    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    expect(screen.getByDisplayValue('manzana')).toBeTruthy();
    expect(screen.getByDisplayValue('Frutas')).toBeTruthy();
    expect(screen.getByDisplayValue('$0 - $1.000')).toBeTruthy();
    expect(screen.getByDisplayValue('En stock')).toBeTruthy();
    expect(screen.getByDisplayValue('Precio (mayor a menor)')).toBeTruthy();
  });

  it('should disable all filter controls when loading is true', () => {
    mockUseProducts.mockReturnValue({
      products: [],
      filteredProducts: [],
      loading: true,
      error: null,
      searchTerm: '',
      setSearchTerm: mockSetSearchTerm,
      selectedCategory: '',
      setSelectedCategory: mockSetSelectedCategory,
      priceRange: '',
      setPriceRange: mockSetPriceRange,
      stockFilter: '',
      setStockFilter: mockSetStockFilter,
      sortBy: 'name-asc',
      setSortBy: mockSetSortBy,
      clearFilters: mockClearFilters,
      refreshProducts: jest.fn(),
    });

    render(
      <TestWrapper>
        <ProductFilters />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Buscar productos...');
    const categorySelect = screen.getByDisplayValue('Todas las categorías');
    const priceSelect = screen.getByDisplayValue('Todos los precios');
    const stockSelect = screen.getByDisplayValue('Todos');
    const sortSelect = screen.getByDisplayValue('Nombre (A-Z)');
    const clearButton = screen.getByText('Limpiar filtros');

    expect(searchInput).toBeDisabled();
    expect(categorySelect).toBeDisabled();
    expect(priceSelect).toBeDisabled();
    expect(stockSelect).toBeDisabled();
    expect(sortSelect).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });
});
