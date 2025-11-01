import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Button, Form, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faUserTag, faEdit, faSave, faTimes, faHome, faShoppingCart, faLeaf, faInfoCircle, faBlog } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../components/common/NotificationProvider';
import { User } from '../services/api';

const Profile: React.FC = () => {
  const { user, isAuthenticated, updateProfile, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification('Debes iniciar sesión para ver tu perfil.', 'error');
      return;
    }

    // For now, use the user from auth context
    // In a real app, you might fetch additional profile data from API
    setUserProfile(user);
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        address: user.address || ''
      });
    }
    setLoading(false);
  }, [isAuthenticated, user, showNotification]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors({});
    if (!isEditing && user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        address: user.address || ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editForm.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!editForm.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!editForm.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El teléfono es requerido';
    }

    if (!editForm.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    try {
      const updatedUser = await updateProfile({
        name: editForm.name,
        email: editForm.email,
        phoneNumber: editForm.phoneNumber,
        address: editForm.address
      });

      setUserProfile(updatedUser);
      setIsEditing(false);
      showNotification('Perfil actualizado exitosamente', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Error al actualizar el perfil. El correo electrónico podría estar en uso.', 'error');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="warning" className="text-center">
              <h4>Acceso Denegado</h4>
              <p>Debes iniciar sesión para acceder a tu perfil.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Spinner animation="border" variant="success" />
            <p className="mt-3">Cargando perfil...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!userProfile) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center">
              <h4>Error</h4>
              <p>No se pudo cargar la información del perfil.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Navigation Tabs */}
      <Row className="justify-content-center mb-4">
        <Col lg={10}>
          <Nav variant="tabs" className="justify-content-center custom-nav-tabs">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="d-flex align-items-center custom-nav-link">
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Inicio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/productos" className="d-flex align-items-center custom-nav-link">
                <FontAwesomeIcon icon={faLeaf} className="me-2" />
                Productos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/carrito" className="d-flex align-items-center custom-nav-link">
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Carrito
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/nosotros" className="d-flex align-items-center custom-nav-link">
                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                Nosotros
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/blog" className="d-flex align-items-center custom-nav-link">
                <FontAwesomeIcon icon={faBlog} className="me-2" />
                Blog
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="text-success fw-bold mb-2">Mi Perfil</h2>
                  <p className="text-muted mb-0">Información de tu cuenta</p>
                </div>
                <Button
                  variant={isEditing ? "outline-danger" : "outline-success"}
                  onClick={handleEditToggle}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} className="me-2" />
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Button>
              </div>

              {isEditing ? (
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>
                          <FontAwesomeIcon icon={faUser} className="me-2 text-success" />
                          Nombre
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleInputChange}
                          isInvalid={!!errors.name}
                          disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>
                          <FontAwesomeIcon icon={faEnvelope} className="me-2 text-success" />
                          Correo Electrónico
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          isInvalid={!!errors.email}
                          disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>
                          <FontAwesomeIcon icon={faPhone} className="me-2 text-success" />
                          Teléfono
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          value={editForm.phoneNumber}
                          onChange={handleInputChange}
                          isInvalid={!!errors.phoneNumber}
                          disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-success" />
                          Dirección
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={editForm.address}
                          onChange={handleInputChange}
                          isInvalid={!!errors.address}
                          disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {userProfile.role && (
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>
                            <FontAwesomeIcon icon={faUserTag} className="me-2 text-success" />
                            Rol
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={userProfile.role}
                            disabled
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    )}
                  </Row>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                      variant="outline-secondary"
                      onClick={handleEditToggle}
                      disabled={isLoading}
                    >
                      <FontAwesomeIcon icon={faTimes} className="me-2" />
                      Cancelar
                    </Button>
                    <Button
                      variant="success"
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faSave} className="me-2" />
                          Guardar Cambios
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <Row>
                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className="text-success me-3" size="lg" />
                        <div>
                          <strong>Nombre:</strong>
                          <p className="mb-0">{userProfile.name}</p>
                        </div>
                      </div>
                    </Col>

                    <Col md={6} className="mb-3">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-success me-3" size="lg" />
                        <div>
                          <strong>Correo Electrónico:</strong>
                          <p className="mb-0">{userProfile.email}</p>
                        </div>
                      </div>
                    </Col>

                    {userProfile.phoneNumber && (
                      <Col md={6} className="mb-3">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faPhone} className="text-success me-3" size="lg" />
                          <div>
                            <strong>Teléfono:</strong>
                            <p className="mb-0">{userProfile.phoneNumber}</p>
                          </div>
                        </div>
                      </Col>
                    )}

                    {userProfile.address && (
                      <Col md={6} className="mb-3">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-success me-3" size="lg" />
                          <div>
                            <strong>Dirección:</strong>
                            <p className="mb-0">{userProfile.address}</p>
                          </div>
                        </div>
                      </Col>
                    )}

                    {userProfile.role && (
                      <Col md={6} className="mb-3">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faUserTag} className="text-success me-3" size="lg" />
                          <div>
                            <strong>Rol:</strong>
                            <p className="mb-0">{userProfile.role}</p>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Row>

                  <div className="text-center mt-4">
                    <p className="text-muted small">
                      Haz clic en "Editar" para actualizar tu información personal.
                    </p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
