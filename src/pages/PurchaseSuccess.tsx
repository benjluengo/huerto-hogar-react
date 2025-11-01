import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiService, Order } from '../services/api';
import Layout from '../components/layout/Layout';

const PurchaseSuccess: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('ID de pedido no encontrado');
        setLoading(false);
        return;
      }

      try {
        // Note: This assumes the API has an endpoint to get order by ID
        // You may need to add this endpoint to the backend if it doesn't exist
        const orderData = await apiService.getOrderById(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('No se pudieron cargar los detalles del pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Layout>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Spinner animation="border" variant="success" />
              <p className="mt-3">Cargando detalles del pedido...</p>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger" className="text-center">
                <FontAwesomeIcon icon={faCheckCircle} size="3x" className="text-success mb-3" />
                <h2>¡Compra Realizada con Éxito!</h2>
                <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
                <p>Recibirás un correo electrónico con los detalles de tu pedido.</p>
                <p className="text-muted small">{error}</p>
                <div className="mt-4">
                  <Button variant="success" onClick={() => navigate('/')} className="me-2">
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Volver al Inicio
                  </Button>
                  <Button variant="outline-success" onClick={() => navigate('/productos')}>
                    <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                    Seguir Comprando
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow border-0">
              <Card.Body className="text-center p-5">
                <FontAwesomeIcon icon={faCheckCircle} size="4x" className="text-success mb-4" />
                <h2 className="text-success fw-bold mb-3">¡Compra Realizada con Éxito!</h2>
                <p className="text-muted mb-4">
                  Gracias por tu compra. Tu pedido ha sido procesado correctamente.
                  Recibirás un correo electrónico con los detalles de tu pedido.
                </p>

                {order && (
                  <Card className="bg-light border-success mb-4">
                    <Card.Body className="text-start">
                      <h4 className="text-success mb-3">Detalles del Pedido</h4>
                      <Row>
                        <Col md={6}>
                          <p><strong>ID de Pedido:</strong> {orderId}</p>
                          <p><strong>Fecha de Pedido:</strong> {new Date().toLocaleDateString('es-CL')}</p>
                          <p><strong>Fecha de Entrega:</strong> {new Date(order.deliveryDate).toLocaleDateString('es-CL')}</p>
                        </Col>
                        <Col md={6}>
                          <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                          <p><strong>Estado:</strong> {order.status === 'PENDING' ? 'Pendiente' : order.status}</p>
                        </Col>
                      </Row>
                      <div className="mt-3">
                        <strong>Productos:</strong>
                        <ul className="list-unstyled mt-2">
                          {order.orderItems.map((item, index) => (
                            <li key={index} className="d-flex justify-content-between py-1">
                              <span>{item.product.name}</span>
                              <span>Cantidad: {item.quantity} - ${item.price.toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                )}

                <div className="d-flex justify-content-center gap-3">
                  <Button variant="success" size="lg" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Volver al Inicio
                  </Button>
                  <Button variant="outline-success" size="lg" onClick={() => navigate('/productos')}>
                    <FontAwesomeIcon icon={faShoppingBag} className="me-2" />
                    Seguir Comprando
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PurchaseSuccess;
