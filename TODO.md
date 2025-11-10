# TODO: Mejorar Pruebas Unitarias Existentes

## Información Recopilada
- Proyecto React TypeScript con configuración híbrida de Jest y Jasmine/Karma
- Pruebas existentes identificadas con problemas de consistencia e incompletitud
- Archivos de pruebas: App.spec.tsx, App.test.tsx, Notification.spec.tsx, useAuth.spec.tsx, Profile.spec.tsx, api.spec.ts

## Problemas Identificados en Pruebas Existentes
- **Inconsistencias entre Jest y Jasmine**: Algunos archivos usan Jest en entorno Jasmine
- **Cobertura insuficiente**: App.spec.tsx muy básico, no cubre rutas específicas
- **Mezcla de frameworks**: Notification.spec.tsx usa jest.useFakeTimers en Jasmine
- **Mocks mejorables**: useAuth.spec.tsx podría optimizar mocks
- **Tests básicos**: App.test.tsx solo renderiza sin configuración completa
- **Complejidad innecesaria**: Algunos tests de interceptores en api.spec.ts

## Plan de Mejora
1. Estandarizar framework de testing (mantener Jasmine/Karma para consistencia)
2. Mejorar cobertura de pruebas existentes
3. Corregir inconsistencias entre Jest/Jasmine
4. Optimizar mocks y setup
5. Añadir tests faltantes para rutas específicas
6. Mejorar casos edge y validaciones
7. Verificar que todas las pruebas pasen correctamente

## Archivos a Mejorar
- [ ] `src/App.spec.tsx`: Añadir pruebas de rutas específicas y navegación
- [ ] `src/App.test.tsx`: Mejorar configuración y cobertura
- [ ] `src/components/common/Notification.spec.tsx`: Corregir mezcla Jest/Jasmine
- [ ] `src/hooks/useAuth.spec.tsx`: Optimizar mocks y añadir casos edge
- [ ] `src/pages/Profile.spec.tsx`: Mejorar especificidad de tests
- [ ] `src/services/api.spec.ts`: Simplificar tests complejos de interceptores
- [ ] `src/setupTests.spec.ts`: Mejorar configuración de mocks
- [ ] `karma.conf.js`: Verificar configuración óptima
- [ ] `tsconfig.spec.json`: Asegurar compatibilidad

## Mejoras Específicas por Archivo
### App.spec.tsx
- Añadir pruebas para rutas específicas (/products, /profile, /admin, etc.)
- Probar navegación con MemoryRouter
- Verificar renderizado condicional basado en autenticación
- Probar manejo de rutas no encontradas

### App.test.tsx
- Integrar con configuración completa de providers
- Añadir pruebas de navegación básica
- Verificar carga de CSS y assets

### Notification.spec.tsx
- Reemplazar jest.useFakeTimers con jasmine.clock()
- Usar jasmine.createSpy para mocks
- Mejorar pruebas de timeout y cleanup

### useAuth.spec.tsx
- Mejorar mocks de localStorage con jasmine spies
- Añadir tests para estados de carga
- Probar manejo de tokens expirados
- Añadir tests de integración con AuthProvider

### Profile.spec.tsx
- Añadir pruebas de navegación entre tabs
- Mejorar validaciones de formulario
- Probar estados de error específicos
- Añadir tests de accesibilidad

### api.spec.ts
- Simplificar tests de interceptores
- Mejorar mocks de axios
- Añadir tests de manejo de errores HTTP
- Probar configuración de headers

## Pasos de Implementación
- [x] Corregir inconsistencias Jest/Jasmine
- [x] Mejorar configuración de setupTests.spec.ts
- [x] Actualizar App.spec.tsx con rutas específicas
- [x] Refactorizar Notification.spec.tsx
- [ ] Optimizar useAuth.spec.tsx
- [ ] Mejorar Profile.spec.tsx
- [ ] Simplificar api.spec.ts
- [x] Ejecutar todas las pruebas
- [ ] Verificar cobertura de código
- [x] Documentar mejoras realizadas

## Dependencias y Configuración
- Mantener karma + jasmine para consistencia
- Mejorar configuración de mocks en setupTests.spec.ts
- Asegurar compatibilidad TypeScript
- Verificar ejecución en CI/CD

## Notas Técnicas
- Usar jasmine spies en lugar de jest mocks donde aplique
- Implementar MemoryRouter para pruebas de navegación
- Mejorar aserciones con React Testing Library
- Añadir pruebas de accesibilidad básicas
- Optimizar performance de tests
