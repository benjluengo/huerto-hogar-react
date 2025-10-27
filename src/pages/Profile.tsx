import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../components/common/NotificationProvider';
import { User } from '../services/api';

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      showNotification('Debes iniciar sesión para ver tu perfil.', 'error');
      return;
    }

    // For now, use the user from auth context
    // In a real app, you might fetch additional profile data from API
    setUserProfile(user);
    setLoading(false);
  }, [isAuthenticated, user, showNotification]);

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
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-success fw-bold mb-2">Mi Perfil</h2>
                <p className="text-muted">Información de tu cuenta</p>
              </div>

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
                  Para actualizar tu información, contacta al soporte de Huerto Hogar.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
