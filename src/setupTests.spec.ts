// Configuración de Jasmine para pruebas unitarias
import 'core-js/es/reflect';
import 'core-js/stable/reflect';

// Configurar zona de pruebas para Angular (si es necesario)
// Si no usas Angular, puedes omitir esta línea
// import 'zone.js/dist/zone-testing';

// Configurar el entorno de pruebas
Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

// Mock para localStorage
const localStorageMock = {
  getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
    return localStorageMock.store[key] || null;
  }),
  setItem: jasmine.createSpy('setItem').and.callFake((key: string, value: string) => {
    localStorageMock.store[key] = value.toString();
  }),
  removeItem: jasmine.createSpy('removeItem').and.callFake((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: jasmine.createSpy('clear').and.callFake(() => {
    localStorageMock.store = {};
  }),
  store: {} as { [key: string]: string }
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock para sessionStorage
const sessionStorageMock = {
  getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
    return sessionStorageMock.store[key] || null;
  }),
  setItem: jasmine.createSpy('setItem').and.callFake((key: string, value: string) => {
    sessionStorageMock.store[key] = value.toString();
  }),
  removeItem: jasmine.createSpy('removeItem').and.callFake((key: string) => {
    delete sessionStorageMock.store[key];
  }),
  clear: jasmine.createSpy('clear').and.callFake(() => {
    sessionStorageMock.store = {};
  }),
  store: {} as { [key: string]: string }
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock para console methods usando jasmine spies
const consoleWarn = console.warn;
const consoleError = console.error;
const consoleLog = console.log;

beforeAll(() => {
  // Silenciar warnings y errores en consola durante pruebas
  console.warn = jasmine.createSpy('warn');
  console.error = jasmine.createSpy('error');
  console.log = jasmine.createSpy('log');
});

afterAll(() => {
  // Restaurar console methods
  console.warn = consoleWarn;
  console.error = consoleError;
  console.log = consoleLog;
});

// Limpiar mocks después de cada prueba
afterEach(() => {
  // Limpiar localStorage mock
  localStorageMock.clear();
  localStorageMock.getItem.calls.reset();
  localStorageMock.setItem.calls.reset();
  localStorageMock.removeItem.calls.reset();

  // Limpiar sessionStorage mock
  sessionStorageMock.clear();
  sessionStorageMock.getItem.calls.reset();
  sessionStorageMock.setItem.calls.reset();
  sessionStorageMock.removeItem.calls.reset();

  // Limpiar console spies
  (console.warn as jasmine.Spy).calls.reset();
  (console.error as jasmine.Spy).calls.reset();
  (console.log as jasmine.Spy).calls.reset();
});
