import { useState, useEffect } from 'react';
import { Product, apiService } from '../services/api';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  priceRange: string;
  stockFilter: string;
  sortBy: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: string) => void;
  setStockFilter: (filter: string) => void;
  setSortBy: (sort: string) => void;
  clearFilters: () => void;
  refreshProducts: () => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  // Cargar productos desde la API
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Error al cargar los productos. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let filtered = [...products];

    // Filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro de categoría
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtro de precio
    if (priceRange) {
      filtered = filtered.filter(product => {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange.endsWith('+')) {
          return product.price >= min;
        }
        return product.price >= min && product.price <= max;
      });
    }

    // Filtro de stock
    if (stockFilter) {
      switch (stockFilter) {
        case 'available':
          filtered = filtered.filter(product => product.stock > 0);
          break;
        case 'low-stock':
          filtered = filtered.filter(product => product.stock > 0 && product.stock < 50);
          break;
      }
    }

    // Ordenamiento
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'stock-desc':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, stockFilter, sortBy]);

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange('');
    setStockFilter('');
    setSortBy('name-asc');
  };

  // Refrescar productos
  const refreshProducts = async () => {
    await loadProducts();
  };

  // Cargar productos al inicializar
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    selectedCategory,
    priceRange,
    stockFilter,
    sortBy,
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    setStockFilter,
    setSortBy,
    clearFilters,
    refreshProducts,
  };
};
