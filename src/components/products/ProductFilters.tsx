import React from 'react';
import { Card, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { faSearch, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProducts } from '../../hooks/useProducts';

const ProductFilters: React.FC<{}> = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    stockFilter,
    setStockFilter,
    sortBy,
    setSortBy,
    clearFilters,
    loading
  } = useProducts();

  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'Frutas', label: 'Frutas' },
    { value: 'Verduras', label: 'Verduras' },
    { value: 'Productos Orgánicos', label: 'Productos Orgánicos' },
    { value: 'Productos Lácteos', label: 'Productos Lácteos' },
    { value: 'PLANTAS', label: 'Plantas' },
    { value: 'HERRAMIENTAS', label: 'Herramientas' },
    { value: 'MACETAS', label: 'Macetas' },
    { value: 'SUSTRATOS', label: 'Sustratos' },
    { value: 'FERTILIZANTES', label: 'Fertilizantes' }
  ];

  const priceRanges = [
    { value: '', label: 'Todos los precios' },
    { value: '0-1000', label: '$0 - $1.000' },
    { value: '1000-2000', label: '$1.000 - $2.000' },
    { value: '2000-5000', label: '$2.000 - $5.000' },
    { value: '5000+', label: '$5.000+' }
  ];

  const stockOptions = [
    { value: '', label: 'Todos' },
    { value: 'available', label: 'En stock' },
    { value: 'low-stock', label: 'Stock bajo (menos de 50)' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Nombre (A-Z)' },
    { value: 'name-desc', label: 'Nombre (Z-A)' },
    { value: 'price-asc', label: 'Precio (menor a mayor)' },
    { value: 'price-desc', label: 'Precio (mayor a menor)' },
    { value: 'stock-desc', label: 'Stock (mayor a menor)' }
  ];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        {/* Barra de búsqueda */}
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Filtros */}
        <Row className="g-3">
          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label className="fw-bold text-success">Categoría</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label className="fw-bold text-success">Rango de precio</Form.Label>
              <Form.Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                disabled={loading}
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label className="fw-bold text-success">Disponibilidad</Form.Label>
              <Form.Select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                disabled={loading}
              >
                {stockOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6} lg={3}>
            <Form.Group>
              <Form.Label className="fw-bold text-success">Ordenar por</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disabled={loading}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Botón de limpiar filtros */}
        <Row className="mt-3">
          <Col className="text-end">
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              disabled={loading}
              className="d-flex align-items-center ms-auto"
            >
              <FontAwesomeIcon icon={faEraser} className="me-2" />
              Limpiar filtros
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductFilters;
