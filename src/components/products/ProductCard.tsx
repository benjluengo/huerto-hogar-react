import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../common/NotificationProvider';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showNotification('Debes iniciar sesión para agregar productos al carrito', 'warning');
      return;
    }

    try {
      addToCart(product);
      showNotification('Producto agregado al carrito', 'success');
    } catch (error) {
      showNotification(error instanceof Error ? error.message : 'Error al agregar producto', 'error');
    }
  };

  const formatCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Frutas': 'Frutas',
      'Verduras': 'Verduras',
      'Productos Orgánicos': 'Productos Orgánicos',
      'Productos Lácteos': 'Productos Lácteos',
      'PLANTAS': 'Plantas',
      'HERRAMIENTAS': 'Herramientas',
      'MACETAS': 'Macetas',
      'SUSTRATOS': 'Sustratos',
      'FERTILIZANTES': 'Fertilizantes'
    };
    return categoryMap[category] || category;
  };

  return (
    <Card className="h-100 shadow-sm hover-shadow transition-all">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
          }}
        />
        {product.stock === 0 && (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
            Sin Stock
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-success fw-bold mb-2" style={{ fontSize: '1.1rem' }}>
          {product.name}
        </Card.Title>

        <Card.Text className="text-muted small mb-2">
          {formatCategory(product.category)}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 text-success fw-bold mb-0">
              ${product.price.toLocaleString()}
            </span>
            {product.stock > 0 && (
              <small className="text-muted">
                Stock: {product.stock}
              </small>
            )}
          </div>

          <Button
            variant={product.stock > 0 ? "success" : "secondary"}
            className="w-100"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faCartPlus} className="me-2" />
            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
