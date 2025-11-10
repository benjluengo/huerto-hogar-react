import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import ProductGrid from './ProductGrid';
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

describe('ProductGrid Component', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading spinner when loading', async () => {
    mockUseProducts.mockReturnValue({
      products: [],
      filteredProducts: [],
      loading: true,
      error: null,
      searchTerm: '',
      setSearchTerm: jest.fn(),
      selectedCategory: '',
      setSelectedCategory: jest.fn(),
      priceRange: '',
      setPriceRange: jest.fn(),
      stockFilter: '',
      setStockFilter: jest.fn(),
      sortBy: 'name-asc',
      setSortBy: jest.fn(),
      clearFilters: jest.fn(),
      refreshProducts: jest.fn(),
    });

    await act(async () => {
      render(
        <TestWrapper>
          <ProductGrid />
        </TestWrapper>
      );
    });

    expect(screen.getByText('Cargando productos...')).toBeTruthy();
  });

  it('should render error message when there is an error', async () => {
    const mockError = 'Error al cargar productos';

    mockUseProducts.mockReturnValue({
      products: [],
      filteredProducts: [],
      loading: false,
      error: mockError,
      searchTerm: '',
      setSearchTerm: jest.fn(),
      selectedCategory: '',
      setSelectedCategory: jest.fn(),
      priceRange: '',
      setPriceRange: jest.fn(),
      stockFilter: '',
      setStockFilter: jest.fn(),
      sortBy: 'name-asc',
      setSortBy: jest.fn(),
      clearFilters: jest.fn(),
      refreshProducts: jest.fn(),
    });

    await act(async () => {
      render(
        <TestWrapper>
          <ProductGrid />
        </TestWrapper>
      );
    });

    const errorElements = screen.getAllByText('Error al cargar productos');
    expect(errorElements).toHaveLength(2); // h5 and p elements
  });

  it('should render no products message when filteredProducts is empty', async () => {
    mockUseProducts.mockReturnValue({
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: jest.fn(),
      selectedCategory: '',
      setSelectedCategory: jest.fn(),
      priceRange: '',
      setPriceRange: jest.fn(),
      stockFilter: '',
      setStockFilter: jest.fn(),
      sortBy: 'name-asc',
      setSortBy: jest.fn(),
      clearFilters: jest.fn(),
      refreshProducts: jest.fn(),
    });

    await act(async () => {
      render(
        <TestWrapper>
          <ProductGrid />
        </TestWrapper>
      );
    });

    expect(screen.getByText('No se encontraron productos')).toBeTruthy();
  });

  it('should render products when available', async () => {
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      filteredProducts: mockProducts,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: jest.fn(),
      selectedCategory: '',
      setSelectedCategory: jest.fn(),
      priceRange: '',
      setPriceRange: jest.fn(),
      stockFilter: '',
      setStockFilter: jest.fn(),
      sortBy: 'name-asc',
      setSortBy: jest.fn(),
      clearFilters: jest.fn(),
      refreshProducts: jest.fn(),
    });

    await act(async () => {
      render(
        <TestWrapper>
          <ProductGrid />
        </TestWrapper>
      );
    });

    expect(screen.getByText('Producto 1')).toBeTruthy();
    expect(screen.getByText('Producto 2')).toBeTruthy();
  });

  it('should render correct number of product cards', async () => {
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      filteredProducts: mockProducts,
      loading: false,
      error: null,
      searchTerm: '',
      setSearchTerm: jest.fn(),
      selectedCategory: '',
      setSelectedCategory: jest.fn(),
      priceRange: '',
      setPriceRange: jest.fn(),
      stockFilter: '',
      setStockFilter: jest.fn(),
      sortBy: 'name-asc',
      setSortBy: jest.fn(),
      clearFilters: jest.fn(),
      refreshProducts: jest.fn(),
    });

    await act(async () => {
      render(
        <TestWrapper>
          <ProductGrid />
        </TestWrapper>
      );
    });

    const productCards = screen.getAllByRole('img'); // ProductCard renders images
    expect(productCards).toHaveLength(mockProducts.length);
  });
});
