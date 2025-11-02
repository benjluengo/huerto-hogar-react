# TODO: Configurar Pruebas Unitarias con Jasmine y Karma

## Información Recopilada
- Proyecto React TypeScript con dependencias de Jasmine y Karma ya instaladas
- Estructura del proyecto: componentes, hooks, páginas, servicios
- Archivos principales a probar: useAuth hook, Notification component, Profile page, api service, App component
- Configuración actual usa Jest, pero se requiere migrar a Karma + Jasmine

## Plan de Implementación
1. Configurar Karma con Jasmine para TypeScript
2. Crear archivos de configuración necesarios
3. Crear pruebas unitarias para componentes principales
4. Crear pruebas para hooks personalizados
5. Crear pruebas para servicios
6. Actualizar scripts de package.json
7. Ejecutar pruebas y verificar funcionamiento

## Archivos a Crear/Modificar
- karma.conf.js: Configuración principal de Karma
- tsconfig.spec.json: Configuración TypeScript para pruebas
- src/setupTests.spec.ts: Configuración de Jasmine para pruebas
- src/components/common/Notification.spec.tsx: Pruebas del componente Notification
- src/hooks/useAuth.spec.tsx: Pruebas del hook useAuth
- src/pages/Profile.spec.tsx: Pruebas del componente Profile
- src/services/api.spec.ts: Pruebas del servicio API
- src/App.spec.tsx: Pruebas del componente App
- package.json: Actualizar scripts para usar Karma

## Pasos de Implementación
- [ ] Crear karma.conf.js con configuración para Jasmine, TypeScript y React
- [ ] Crear tsconfig.spec.json para pruebas
- [ ] Configurar setupTests.spec.ts para Jasmine
- [ ] Crear pruebas para Notification component
- [ ] Crear pruebas para useAuth hook
- [ ] Crear pruebas para Profile page
- [ ] Crear pruebas para api service
- [ ] Crear pruebas para App component
- [ ] Actualizar package.json scripts
- [ ] Ejecutar pruebas y verificar cobertura

## Dependencias
- jasmine: Framework de pruebas
- karma: Test runner
- karma-jasmine: Adaptador Jasmine para Karma
- karma-chrome-launcher: Ejecutar en Chrome
- karma-typescript: Soporte TypeScript
- karma-webpack: Soporte Webpack
- @types/jasmine: Tipos TypeScript para Jasmine

## Notas Técnicas
- Usar describe() e it() de Jasmine
- Configurar karma-typescript para compilar archivos .spec.tsx
- Mockear dependencias externas (axios, localStorage)
- Usar beforeEach para setup de pruebas
- Verificar renderizado de componentes con React Testing Library si es necesario
