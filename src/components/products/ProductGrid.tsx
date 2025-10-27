import React from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './ProductCard';

const ProductGrid: React.FC<{}> = () => {
  const { filteredProducts, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" size="sm" />
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        <h5>Error al cargar productos</h5>
        <p>{error}</p>
        <button
          className="btn btn-outline-danger"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </Alert>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="fas fa-search fa-3x text-muted"></i>
        </div>
        <h4 className="text-muted">No se encontraron productos</h4>
        <p className="text-muted">
          Intenta ajustar tus filtros de búsqueda o busca con otros términos.
        </p>
      </div>
    );
  }

  return (
    <Row className="g-4">
      {filteredProducts.map(product => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
