import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { faShoppingCart, faUser, faSignInAlt, faUserPlus, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Navbar: React.FC<{}> = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="text-success me-2">🥕</span>
          <span className="fw-bold text-success">Huerto Hogar</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-success">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/nosotros" className="text-success">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/blog" className="text-success">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto" className="text-success">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/productos" className="text-success">Productos</Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center">
            {/* Carrito */}
            <Nav.Link as={Link} to="/carrito" className="position-relative me-3">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" className="text-success" />
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: '0.7rem', minWidth: '20px' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </Nav.Link>

            {/* Menú de usuario */}
            <div className="position-relative">
              <button
                className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '45px', height: '45px' }}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {isAuthenticated && user ? (
                  <span className="text-white fw-bold" style={{ fontSize: '0.9rem' }}>
                    {getUserInitials(user.name)}
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </button>

              {showUserMenu && (
                <div
                  className="position-absolute end-0 mt-2 bg-white border rounded shadow-lg"
                  style={{ width: '180px', zIndex: 1050 }}
                >
                  {isAuthenticated && user ? (
                    <>
                      <Link
                        to="/perfil"
                        className="d-block px-3 py-2 text-decoration-none text-dark hover-success"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                        Mi Perfil
                      </Link>
                      <hr className="my-1" />
                      <button
                        className="w-100 text-start btn btn-link text-decoration-none px-3 py-2 text-dark hover-danger"
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="d-block px-3 py-2 text-decoration-none text-dark hover-success"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                        Iniciar Sesión
                      </Link>
                      <Link
                        to="/registro"
                        className="d-block px-3 py-2 text-decoration-none text-dark hover-success"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>

      {/* Overlay para cerrar menú */}
      {showUserMenu && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1040 }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </BootstrapNavbar>
  );
};

export default Navbar;
