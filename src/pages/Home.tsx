import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { faLeaf, faShoppingCart, faUsers, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';

const Home: React.FC<{}> = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section bg-success text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Productos Frescos del Campo a tu Mesa
              </h1>
              <p className="lead mb-4">
                Conectamos directamente a productores locales con consumidores conscientes.
                Productos orgánicos, frescos y de calidad garantizada.
              </p>
              <div className="d-flex gap-3">
                <Link to="/productos" className="btn btn-light btn-lg text-success fw-bold">
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                  Ver Productos
                </Link>
                <Link to="/nosotros" className="btn btn-outline-light btn-lg">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Conócenos
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <FontAwesomeIcon icon={faLeaf} size="10x" className="text-white opacity-75" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Características */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="text-success fw-bold">¿Por qué elegir Huerto Hogar?</h2>
              <p className="text-muted">Descubre las ventajas de comprar productos locales y orgánicos</p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faLeaf} size="2x" className="text-success" />
                  </div>
                  <Card.Title className="text-success fw-bold">100% Orgánico</Card.Title>
                  <Card.Text className="text-muted">
                    Todos nuestros productos provienen de agricultura orgánica certificada,
                    sin químicos ni pesticidas.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faUsers} size="2x" className="text-success" />
                  </div>
                  <Card.Title className="text-success fw-bold">Apoyo Local</Card.Title>
                  <Card.Text className="text-muted">
                    Apoyamos a productores locales, fortaleciendo la economía regional
                    y reduciendo la huella de carbono.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faTruck} size="2x" className="text-success" />
                  </div>
                  <Card.Title className="text-success fw-bold">Entrega Rápida</Card.Title>
                  <Card.Text className="text-muted">
                    Entregas directas desde el productor, garantizando la máxima frescura
                    en tus productos.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Productos Destacados */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="text-success fw-bold">Productos Destacados</h2>
              <p className="text-muted">Descubre nuestra selección de productos más populares</p>
            </Col>
          </Row>

          <ProductGrid />
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-success text-white py-5">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">¿Listo para probar productos frescos y orgánicos?</h2>
          <p className="lead mb-4">
            Únete a nuestra comunidad de consumidores conscientes y descubre el sabor real de los productos locales.
          </p>
          <Link to="/productos" className="btn btn-light btn-lg text-success fw-bold">
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Explorar Todos los Productos
          </Link>
        </Container>
      </section>
    </Layout>
  );
};

export default Home;
