import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const Products: React.FC<{}> = () => {
  const { filteredProducts } = useProducts();

  return (
    <Layout>
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-success fw-bold mb-3">Nuestros Productos</h1>
            <p className="text-muted lead">
              Descubre nuestra amplia selección de productos frescos y orgánicos
            </p>
          </Col>
        </Row>

        {/* Información de resultados */}
        <Row className="mb-3">
          <Col>
            <Alert variant="info" className="d-flex justify-content-between align-items-center">
              <span>
                Mostrando <strong>{filteredProducts.length}</strong> productos
              </span>
              <small className="text-muted">
                Productos frescos y orgánicos de productores locales
              </small>
            </Alert>
          </Col>
        </Row>

        {/* Filtros */}
        <ProductFilters />

        {/* Grid de productos */}
        <ProductGrid />
      </Container>
    </Layout>
  );
};

export default Products;
