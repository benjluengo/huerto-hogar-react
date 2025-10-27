import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSignOutAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useNotification } from '../components/common/NotificationProvider';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'users'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'PLANTAS',
    image: ''
  });

  // User form state
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: 'USER'
  });

  useEffect(() => {
    // Check admin authentication
    if (!localStorage.getItem('huertohogar_adminLoggedIn')) {
      navigate('/admin-login');
      return;
    }

    if (activeTab === 'products') {
      loadProducts();
    } else {
      loadUsers();
    }
  }, [activeTab, navigate]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts();
      // Transform data to match our interface
      const transformedProducts: Product[] = data.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image
      }));
      setProducts(transformedProducts);
    } catch (error) {
      showNotification('Error al cargar productos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Note: This endpoint might need to be added to the API service
      const response = await fetch('http://localhost:8080/api/users', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      showNotification('Error al cargar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('huertohogar_adminLoggedIn');
    showNotification('Sesión cerrada', 'info');
    navigate('/');
  };

  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'PLANTAS',
        image: ''
      });
    }
    setShowProductModal(true);
  };

  const openUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      const [firstName = '', ...lastNameParts] = user.name ? user.name.split(' ') : ['', ''];
      const lastName = lastNameParts.join(' ');
      setUserForm({
        firstName,
        lastName,
        email: user.email,
        phone: user.phoneNumber || '',
        address: user.address || '',
        password: '',
        role: user.role
      });
    } else {
      setEditingUser(null);
      setUserForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: 'USER'
      });
    }
    setShowUserModal(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      category: productForm.category,
      image: productForm.image
    };

    try {
      if (editingProduct) {
        // Update product
        await fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        showNotification('Producto actualizado exitosamente', 'success');
      } else {
        // Create product
        await fetch('http://localhost:8080/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        showNotification('Producto creado exitosamente', 'success');
      }
      setShowProductModal(false);
      loadProducts();
    } catch (error) {
      showNotification('Error al guardar producto', 'error');
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name: `${userForm.firstName} ${userForm.lastName}`,
      email: userForm.email,
      phoneNumber: userForm.phone,
      address: userForm.address,
      role: userForm.role,
      ...(userForm.password && { password: userForm.password })
    };

    try {
      if (editingUser) {
        // Update user
        await fetch(`http://localhost:8080/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        showNotification('Usuario actualizado exitosamente', 'success');
      } else {
        // Create user
        await fetch('http://localhost:8080/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        showNotification('Usuario creado exitosamente', 'success');
      }
      setShowUserModal(false);
      loadUsers();
    } catch (error) {
      showNotification('Error al guardar usuario', 'error');
    }
  };

  const deleteProduct = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE'
      });
      showNotification('Producto eliminado exitosamente', 'success');
      loadProducts();
    } catch (error) {
      showNotification('Error al eliminar producto', 'error');
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    try {
      await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE'
      });
      showNotification('Usuario eliminado exitosamente', 'success');
      loadUsers();
    } catch (error) {
      showNotification('Error al eliminar usuario', 'error');
    }
  };

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      'PLANTAS': 'Plantas',
      'HERRAMIENTAS': 'Herramientas',
      'MACETAS': 'Macetas',
      'SUSTRATOS': 'Sustratos',
      'FERTILIZANTES': 'Fertilizantes'
    };
    return categories[category] || category;
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f4f9f4', minHeight: '100vh' }}>
      {/* Header */}
      <nav style={{
        backgroundColor: '#2f6627',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontWeight: '700' }}>Dashboard Administrador</h1>
        <Button
          variant="danger"
          onClick={handleLogout}
          style={{ fontWeight: '600' }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Cerrar Sesión
        </Button>
      </nav>

      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '220px',
          backgroundColor: '#d9ead3',
          padding: '1rem',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li
              style={{
                padding: '0.8rem',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: '600',
                transition: 'background-color 0.3s',
                backgroundColor: activeTab === 'products' ? '#a3c293' : 'transparent',
                color: activeTab === 'products' ? '#1b3a0a' : 'inherit'
              }}
              onClick={() => setActiveTab('products')}
            >
              Productos
            </li>
            <li
              style={{
                padding: '0.8rem',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: '600',
                transition: 'background-color 0.3s',
                backgroundColor: activeTab === 'users' ? '#a3c293' : 'transparent',
                color: activeTab === 'users' ? '#1b3a0a' : 'inherit'
              }}
              onClick={() => setActiveTab('users')}
            >
              Usuarios
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#2f6627', margin: 0 }}>Gestión de Productos</h2>
                <Button
                  variant="success"
                  onClick={() => openProductModal()}
                  style={{ fontWeight: '600' }}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Agregar Producto
                </Button>
              </div>

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead style={{ backgroundColor: '#a3c293', color: '#1b3a0a' }}>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Categoría</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price.toLocaleString('es-CL')}</td>
                        <td>{product.stock}</td>
                        <td>{getCategoryName(product.category)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openProductModal(product)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: '#2f6627', margin: 0 }}>Gestión de Usuarios</h2>
                <Button
                  variant="success"
                  onClick={() => openUserModal()}
                  style={{ fontWeight: '600' }}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Agregar Usuario
                </Button>
              </div>

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead style={{ backgroundColor: '#a3c293', color: '#1b3a0a' }}>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Dirección</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name || 'No especificado'}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber || 'No especificado'}</td>
                        <td>{user.address || 'No especificada'}</td>
                        <td>{user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openUserModal(user)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteUser(user.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProductSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    required
                  >
                    <option value="PLANTAS">Plantas</option>
                    <option value="HERRAMIENTAS">Herramientas</option>
                    <option value="MACETAS">Macetas</option>
                    <option value="SUSTRATOS">Sustratos</option>
                    <option value="FERTILIZANTES">Fertilizantes</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="100"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="url"
                value={productForm.image}
                onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProductModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? 'Actualizar' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUserSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                value={userForm.phone}
                onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={userForm.address}
                onChange={(e) => setUserForm({...userForm, address: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                required
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </Form.Select>
            </Form.Group>

            {!editingUser && (
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                    required={!editingUser}
                  />
                  <Button
                    variant="link"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'none',
                      padding: '0'
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </div>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingUser ? 'Actualizar' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
