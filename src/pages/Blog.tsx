import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faRecycle, faHandshake } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/layout/Layout';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Beneficios de una Alimentación Orgánica',
      icon: faLeaf,
      excerpt: 'Consumir productos orgánicos ayuda a reducir la exposición a pesticidas y promueve un estilo de vida más saludable. Además, apoya prácticas agrícolas sostenibles que protegen el medio ambiente.',
      readMore: true
    },
    {
      id: 2,
      title: 'Cómo Reducir el Desperdicio de Alimentos',
      icon: faRecycle,
      excerpt: 'Aprende técnicas para minimizar el desperdicio de alimentos en casa, desde la planificación de comidas hasta el almacenamiento adecuado, contribuyendo a un planeta más sostenible.',
      readMore: true
    },
    {
      id: 3,
      title: 'La Importancia de Apoyar a Agricultores Locales',
      icon: faHandshake,
      excerpt: 'Descubre cómo comprar productos locales fortalece la economía regional y reduce la huella de carbono asociada al transporte de alimentos.',
      readMore: true
    }
  ];

  return (
    <Layout>
      <Container className="py-5">
        <Row className="mb-5">
          <Col className="text-center">
            <h1 className="text-success fw-bold mb-3">Blog - Alimentación Saludable y Sostenibilidad</h1>
            <p className="text-muted lead">
              Descubre consejos, tips y artículos sobre alimentación saludable, sostenibilidad y el apoyo a productores locales
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {blogPosts.map((post) => (
            <Col md={6} lg={4} key={post.id}>
              <Card className="h-100 border-0 shadow">
                <Card.Body className="p-4 text-center">
                  <FontAwesomeIcon
                    icon={post.icon}
                    size="3x"
                    className="text-success mb-3"
                  />
                  <Card.Title className="text-success fw-bold mb-3">
                    {post.title}
                  </Card.Title>
                  <Card.Text className="text-muted mb-4">
                    {post.excerpt}
                  </Card.Text>
                  {post.readMore && (
                    <Button variant="success" className="w-100">
                      Leer más
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <Row className="mt-5">
          <Col className="text-center">
            <Card className="border-0 shadow bg-success text-white">
              <Card.Body className="p-5">
                <h3 className="fw-bold mb-3">¿Quieres aprender más?</h3>
                <p className="lead mb-4">
                  Suscríbete a nuestro newsletter y recibe consejos semanales sobre alimentación saludable
                  y sostenibilidad directamente en tu correo.
                </p>
                <Button variant="light" size="lg" className="text-success fw-bold">
                  Suscribirme al Newsletter
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Blog;
