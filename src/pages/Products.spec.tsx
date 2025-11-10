import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import Products from './Products';
import { useProducts } from '../hooks/useProducts';
import { AuthProvider } from '../hooks/useAuth';
import { CartProvider } from '../hooks/useCart';
import { NotificationProvider } from '../components/common/NotificationProvider';

// Mock del hook useProducts
jest.mock('../hooks/useProducts');

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

describe('Products Page Component', () => {
  const mockProducts = [
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
  ];

  const mockSetSearchTerm = jest.fn();
  const mockSetSelectedCategory = jest.fn();
  const mockSetPriceRange = jest.fn();
  const mockSetStockFilter = jest.fn();
  const mockSetSortBy = jest.fn();
  const mockClearFilters = jest.fn();
  const mockRefreshProducts = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      filteredProducts: mockProducts,
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
      refreshProducts: mockRefreshProducts,
    });
  });

  it('should render page title', () => {
    render(
      <TestWrapper>
        <Products />
      </TestWrapper>
    );

    expect(screen.getByText('Nuestros Productos')).toBeTruthy();
  });

  it('should render ProductFilters component', () => {
    render(
      <TestWrapper>
        <Products />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Buscar productos...')).toBeTruthy();
    expect(screen.getByText('Categoría')).toBeTruthy();
    expect(screen.getByText('Rango de precio')).toBeTruthy();
    expect(screen.getByText('Disponibilidad')).toBeTruthy();
    expect(screen.getByText('Ordenar por')).toBeTruthy();
  });

  it('should render ProductGrid component', () => {
    render(
      <TestWrapper>
        <Products />
      </TestWrapper>
    );

    expect(screen.getByText('Producto 1')).toBeTruthy();
    expect(screen.getByText('Producto 2')).toBeTruthy();
  });

  it('should render navigation tabs', () => {
    render(
      <TestWrapper>
        <Products />
      </TestWrapper>
    );

    expect(screen.getByText('Inicio')).toBeTruthy();
    const productosLinks = screen.getAllByText('Productos');
    expect(productosLinks).toHaveLength(2); // navbar and footer
    const nosotrosLinks = screen.getAllByText('Nosotros');
    expect(nosotrosLinks).toHaveLength(2); // navbar and footer
    const blogLinks = screen.getAllByText('Blog');
    expect(blogLinks).toHaveLength(1); // navbar only
    const contactoLinks = screen.getAllByText('Contacto');
    expect(contactoLinks).toHaveLength(3); // navbar, footer link, and footer heading
  });

  it('should show loading state when loading', async () => {
    await act(async () => {
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
        refreshProducts: mockRefreshProducts,
      });

      render(
        <TestWrapper>
          <Products />
        </TestWrapper>
      );
    });

    expect(screen.getByText('Cargando productos...')).toBeTruthy();
  });

  it('should show error state when there is an error', async () => {
    const mockError = 'Error al cargar productos';

    await act(async () => {
      mockUseProducts.mockReturnValue({
        products: [],
        filteredProducts: [],
        loading: false,
        error: mockError,
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
        refreshProducts: mockRefreshProducts,
      });

      render(
        <TestWrapper>
          <Products />
        </TestWrapper>
      );
    });

    const errorElements = screen.getAllByText('Error al cargar productos');
    expect(errorElements).toHaveLength(2); // h5 and p elements
  });

  it('should show no products message when filteredProducts is empty', async () => {
    await act(async () => {
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
        refreshProducts: mockRefreshProducts,
      });

      render(
        <TestWrapper>
          <Products />
        </TestWrapper>
      );
    });

    expect(screen.getByText('No se encontraron productos')).toBeTruthy();
  });

  it('should display correct number of products', () => {
    render(
      <TestWrapper>
        <Products />
      </TestWrapper>
    );

    const productCards = screen.getAllByRole('img');
    expect(productCards).toHaveLength(mockProducts.length);
  });
});
