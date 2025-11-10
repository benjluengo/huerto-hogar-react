const React = require('react');

const NotificationProvider = ({ children }) => React.createElement('div', { 'data-testid': 'notification-provider' }, children);

const useNotification = () => ({
  showNotification: jest.fn(),
});

module.exports = {
  NotificationProvider,
  useNotification,
};
