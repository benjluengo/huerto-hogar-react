import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { apiService, Order, OrderItem } from '../services/api';
import { useNotification } from '../components/common/NotificationProvider';
import Layout from '../components/layout/Layout';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [deliveryDate, setDeliveryDate] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState('');

  // Calculate minimum delivery date (tomorrow)
  const getMinDeliveryDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    try {
      updateQuantity(productId, newQuantity);
    } catch (error) {
      showNotification('Error al actualizar cantidad: ' + (error as Error).message, 'error');
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    showNotification('Producto eliminado del carrito', 'success');
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      showNotification('Debes iniciar sesión para realizar un pedido', 'error');
      navigate('/login');
      return;
    }

    if (!deliveryDate) {
      setError('Por favor selecciona una fecha de entrega');
      return;
    }

    if (items.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    setIsPlacingOrder(true);
    setError('');

    try {
      // Convert cart items to order items
      const orderItems: OrderItem[] = items.map(item => ({
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: '', // Not needed for order
          stock: item.stock,
        },
        quantity: item.quantity,
        price: item.price,
      }));

      const orderData: Order = {
        user: user!,
        orderItems,
        deliveryDate: new Date(deliveryDate + 'T00:00:00').toISOString(),
        totalAmount: totalPrice,
        status: 'PENDING',
      };

      const orderResponse = await apiService.createOrder(orderData);

      // Clear cart and show success
      clearCart();
      showNotification('¡Pedido realizado exitosamente!', 'success');
      navigate(`/compra-exitosa?orderId=${orderResponse.id}`);

    } catch (error) {
      console.error('Error placing order:', error);
      setError('Error al realizar el pedido. Por favor intenta nuevamente.');
      showNotification('Error al realizar el pedido', 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-muted mb-3" />
              <h3>Tu carrito está vacío</h3>
              <p className="text-muted">Agrega algunos productos para comenzar</p>
              <Button variant="success" onClick={() => navigate('/productos')}>
                Ver Productos
              </Button>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-4">
        <h2 className="mb-4">Carrito de Compras</h2>

        <Row className="cart-mobile-layout">
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Productos ({totalItems})</h5>
              </Card.Header>
              <Card.Body>
                {items.map((item) => (
                  <Row key={item.id} className="align-items-center mb-3 pb-3 border-bottom">
                    <Col xs={3} md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: '80px', objectFit: 'cover' }}
                      />
                    </Col>
                    <Col xs={9} md={4}>
                      <h6 className="mb-1">{item.name}</h6>
                      <small className="text-muted">${item.price.toFixed(2)} c/u</small>
                    </Col>
                    <Col xs={6} md={3}>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                          max={item.stock}
                          className="mx-2 text-center"
                          style={{ width: '60px' }}
                        />
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </div>
                    </Col>
                    <Col xs={3} md={2} className="text-end">
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </Col>
                    <Col xs={3} md={1} className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="mb-4 cart-summary-mobile">
              <Card.Header>
                <h5 className="mb-0">Resumen del Pedido</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal ({totalItems} productos):</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Entrega</Form.Label>
                  <Form.Control
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={getMinDeliveryDate()}
                    required
                  />
                  <Form.Text className="text-muted">
                    Selecciona la fecha deseada para la entrega
                  </Form.Text>
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || !isAuthenticated}
                >
                  {isPlacingOrder ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Procesando...
                    </>
                  ) : (
                    `Realizar Pedido - $${totalPrice.toFixed(2)}`
                  )}
                </Button>

                {!isAuthenticated && (
                  <Alert variant="info" className="mt-3">
                    <small>Debes iniciar sesión para realizar el pedido</small>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Cart;
