import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faLeaf, faUsers, faSeedling, faUser } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section bg-success text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Sobre Huerto Hogar</h1>
              <p className="lead mb-4">
                Conectando el campo con tu mesa desde hace más de 6 años
              </p>
            </Col>
            <Col lg={6}>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Campo agrícola"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Company Info Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="text-success fw-bold mb-4">Nuestra Historia</h2>
              <p className="mb-3">
                HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo
                directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos
                en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt,
                Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción.
              </p>
              <p>
                Nuestra misión es conectar a las familias chilenas con el campo, promoviendo un estilo de vida
                saludable y sostenible.
              </p>
            </Col>
            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Productos frescos"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow">
                <Card.Body className="p-4 text-center">
                  <FontAwesomeIcon icon={faBullseye} size="3x" className="text-success mb-3" />
                  <h2 className="text-success fw-bold mb-3">Nuestra Misión</h2>
                  <p className="lead">
                    Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo
                    hasta la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega.
                    Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los
                    agricultores locales, apoyando prácticas agrícolas sostenibles y promoviendo una
                    alimentación saludable en todos los hogares chilenos.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-success fw-bold text-center mb-5">Nuestro Impacto Ambiental</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow text-center">
                <Card.Body className="p-4">
                  <FontAwesomeIcon icon={faLeaf} size="2x" className="text-success mb-3" />
                  <h4 className="fw-bold mb-3">Huella de Carbono Reducida</h4>
                  <p className="text-muted mb-3">
                    Cada compra que realizas en HuertoHogar contribuye a reducir la huella de carbono.
                    Al elegir productos locales, disminuyes la necesidad de transporte de larga distancia,
                    lo que significa menos emisiones de CO2 y un impacto positivo en el medio ambiente.
                  </p>
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <div className="h3 text-success fw-bold mb-1">30%</div>
                    <div className="small text-muted">Menos CO2 por compra</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow text-center">
                <Card.Body className="p-4">
                  <FontAwesomeIcon icon={faUsers} size="2x" className="text-success mb-3" />
                  <h4 className="fw-bold mb-3">Apoyo a Comunidades Locales</h4>
                  <p className="text-muted mb-3">
                    Tus compras apoyan directamente a las comunidades locales y a los agricultores chilenos.
                    Cada producto que adquieres contribuye al desarrollo sostenible de las zonas rurales,
                    preservando tradiciones agrícolas y fomentando el crecimiento económico local.
                  </p>
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <div className="h3 text-success fw-bold mb-1">500+</div>
                    <div className="small text-muted">Agricultores apoyados</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow text-center">
                <Card.Body className="p-4">
                  <FontAwesomeIcon icon={faSeedling} size="2x" className="text-success mb-3" />
                  <h4 className="fw-bold mb-3">Prácticas Sostenibles</h4>
                  <p className="text-muted mb-3">
                    Trabajamos exclusivamente con agricultores que implementan prácticas agrícolas sostenibles,
                    sin el uso de pesticidas químicos y respetando los ciclos naturales de la tierra. Esto
                    garantiza productos más saludables y un futuro más verde para Chile.
                  </p>
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <div className="h3 text-success fw-bold mb-1">100%</div>
                    <div className="small text-muted">Productos orgánicos</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vision Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow">
                <Card.Body className="p-4 text-center">
                  <FontAwesomeIcon icon={faEye} size="3x" className="text-success mb-3" />
                  <h2 className="text-success fw-bold mb-3">Nuestra Visión</h2>
                  <p className="lead">
                    Nuestra visión es ser la tienda online líder en la distribución de productos frescos y
                    naturales en Chile, reconocida por nuestra calidad excepcional, servicio al cliente y
                    compromiso con la sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional
                    e internacional, estableciendo un nuevo estándar en la distribución de productos agrícolas
                    directos del productor al consumidor.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Developers Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-success fw-bold text-center mb-5">Nuestro Equipo</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="border-0 shadow text-center">
                <Card.Body className="p-4">
                  <FontAwesomeIcon icon={faUser} size="3x" className="text-success mb-3" />
                  <h4 className="fw-bold mb-3">Equipo de Desarrollo</h4>
                  <p className="text-muted mb-3">
                    Este sitio web fue desarrollado por estudiantes de la Escuela de Informática y
                    Telecomunicaciones, con el objetivo de crear una plataforma moderna y accesible
                    para conectar a los consumidores con productos frescos del campo chileno.
                  </p>
                  <div className="bg-success bg-opacity-10 rounded p-3">
                    <strong>DSY1104 - Desarrollo Full Stack</strong>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default About;
