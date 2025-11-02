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

// Mock para console methods si es necesario
const consoleWarn = console.warn;
const consoleError = console.error;

beforeAll(() => {
  // Silenciar warnings y errores en consola durante pruebas
  console.warn = jasmine.createSpy('warn');
  console.error = jasmine.createSpy('error');
});

afterAll(() => {
  // Restaurar console methods
  console.warn = consoleWarn;
  console.error = consoleError;
});

// Limpiar mocks después de cada prueba
afterEach(() => {
  // Limpiar localStorage mock
  localStorageMock.clear();
  localStorageMock.getItem.calls.reset();
  localStorageMock.setItem.calls.reset();
  localStorageMock.removeItem.calls.reset();
});
