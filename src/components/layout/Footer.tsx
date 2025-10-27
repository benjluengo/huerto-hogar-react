import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-success text-white py-5 mt-5">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-3">
              <span className="me-2">🥕</span>
              Huerto Hogar
            </h5>
            <p className="mb-0">
              Conectando el campo con tu mesa. Productos frescos y orgánicos
              directamente del productor.
            </p>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-3 text-warning">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/nosotros" className="text-white text-decoration-none">
                  Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="text-white text-decoration-none">
                  Productos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-white text-decoration-none">
                  Contacto
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <h5 className="mb-3 text-warning">Contacto</h5>
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              <span>+56 9 1234 5678</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              <span>info@huertohogar.cl</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              <span>Santiago, Chile</span>
            </div>
          </Col>
        </Row>

        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Row>
          <Col className="text-center">
            <p className="mb-0" style={{ opacity: 0.8 }}>
              &copy; 2024 Huerto Hogar. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
