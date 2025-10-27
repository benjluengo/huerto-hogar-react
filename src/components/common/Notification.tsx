import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheckCircle} />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationCircle} />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      case 'info':
      default:
        return <FontAwesomeIcon icon={faInfoCircle} />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1050 }}
    >
      <Alert
        variant={getVariant()}
        className="d-flex align-items-center shadow-lg border-0"
        style={{ minWidth: '300px', maxWidth: '500px' }}
        dismissible
        onClose={onClose}
      >
        <span className="me-2">{getIcon()}</span>
        <span className="flex-grow-1">{message}</span>
      </Alert>
    </div>
  );
};

export default Notification;
