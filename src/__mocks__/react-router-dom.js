const React = require('react');

const BrowserRouter = ({ children }) => React.createElement('div', { 'data-testid': 'browser-router' }, children);
const MemoryRouter = ({ children }) => React.createElement('div', { 'data-testid': 'memory-router' }, children);
const Routes = ({ children }) => React.createElement('div', { 'data-testid': 'routes' }, children);
const Route = ({ element }) => element;
const Link = ({ children, to, ...props }) => React.createElement('a', { href: to, ...props }, children);
const NavLink = ({ children, to, ...props }) => React.createElement('a', { href: to, ...props }, children);
const useNavigate = () => jest.fn();
const useParams = () => ({});
const useLocation = () => ({ pathname: '/', search: '', hash: '', state: null });
const useSearchParams = () => [new URLSearchParams(), jest.fn()];
const Navigate = () => null;
const Outlet = () => React.createElement('div', { 'data-testid': 'outlet' });

module.exports = {
  BrowserRouter,
  MemoryRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
  Navigate,
  Outlet,
};
