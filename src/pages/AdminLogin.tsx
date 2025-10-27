import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from '../components/common/NotificationProvider';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.username === 'admin' && formData.password === '1234') {
      // Guardar sesión admin en localStorage
      localStorage.setItem('huertohogar_adminLoggedIn', 'true');
      showNotification('¡Bienvenido Administrador!', 'success');
      navigate('/admin-dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#e6f2e6',
      fontFamily: "'Montserrat', sans-serif"
    }}>
      <Card style={{
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '320px',
        border: 'none'
      }}>
        <Card.Body>
          <Button
            variant="link"
            className="mb-3 p-0 text-decoration-none"
            style={{ color: '#2f6627', fontWeight: '600' }}
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Volver al Inicio
          </Button>

          <h2 style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#2f6627'
          }}>
            Login Administrador
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#2f6627' }}>
                Usuario
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                autoComplete="off"
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '600', color: '#2f6627' }}>
                Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete="off"
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#2f6627',
                border: 'none',
                padding: '0.75rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                borderRadius: '4px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#24621b'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2f6627'}
            >
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminLogin;
