# Calculadora de Cambio de Monedas - IOL Challenge

Aplicación de calculadora de cambio de monedas desarrollada con React, TypeScript y Vite.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **TanStack Query (React Query)** - Gestión de estado del servidor y caché
- **Axios** - Cliente HTTP
- **React Hook Form** - Gestión de formularios
- **React Icons** - Iconos
- **ESLint + Prettier** - Linting y formateo de código

## 📋 Prerequisitos

- Node.js 18+
- npm, yarn o pnpm

## 🛠️ Instalación

1. Clonar el repositorio (o navegar al directorio del proyecto)

2. Instalar dependencias:

```bash
npm install
# o
pnpm install
```

## 🏃 Ejecutar la aplicación

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Preview del build de producción

```bash
npm run preview
```

## 📝 Scripts disponibles

- `npm run dev` o `pnpm dev` - Inicia el servidor de desarrollo
- `npm run build` o `pnpm build` - Crea el build de producción
- `npm run preview` o `pnpm preview` - Previsualiza el build de producción
- `npm run lint` o `pnpm lint` - Ejecuta ESLint
- `npm run lint:fix` o `pnpm lint:fix` - Ejecuta ESLint y corrige errores automáticamente
- `npm run format` o `pnpm format` - Formatea el código con Prettier
- `npm run format:check` o `pnpm format:check` - Verifica el formato del código
- `npm run test` o `pnpm test` - Ejecuta los tests en modo watch
- `npm run test:run` o `pnpm test:run` - Ejecuta los tests una vez
- `npm run test:ui` o `pnpm test:ui` - Ejecuta los tests con interfaz gráfica

## 📁 Estructura del Proyecto

```text
src/
├── components/     # Componentes React
├── hooks/          # Custom hooks
├── services/       # Servicios API
├── types/          # Tipos TypeScript
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
└── index.css       # Estilos globales (Tailwind)
```

## 🐳 Docker

### Construir y ejecutar con Docker Compose

```bash
docker-compose up --build
```

La aplicación estará disponible en `http://localhost:3000`

### Construir imagen Docker

```bash
docker build -t iol-challenge .
```

### Ejecutar contenedor

```bash
docker run -p 3000:80 iol-challenge
```

## 🧪 Tests

Ejecutar los tests:

```bash
npm run test
```

Ejecutar los tests una vez:

```bash
npm run test:run
```

## 🔌 API

La aplicación utiliza la API de [VATComply](https://www.vatcomply.com/documentation) para obtener las tasas de cambio de monedas.

## 🏗️ Decisiones Arquitectónicas

### Separación de Responsabilidades con Custom Hooks

Se implementaron hooks personalizados (`useCurrencies`, `useCurrencyExchange`) para encapsular la lógica de datos y separarla completamente de los componentes de UI.

### Estrategia de Caché Diferenciada con React Query

Se configuraron diferentes tiempos de caché según el tipo de dato:

- **Tasas de cambio**: 5 minutos (`staleTime`) - Los tipos de cambio varían frecuentemente pero no requieren actualización en tiempo real
- **Lista de monedas**: 24 horas - Los datos de monedas son relativamente estáticos
- **Configuración global**: `refetchOnWindowFocus: false` y `retry: 1` para evitar llamadas innecesarias

### Validación Centralizada y Reutilizable

Las funciones de validación en `utils/validation.ts` se utilizan tanto en el cliente (componentes) como en la capa de servicios (API), garantizando consistencia y evitando duplicación de lógica.

### Conditional Fetching

Las queries de React Query utilizan el parámetro `enabled` para evitar llamadas innecesarias a la API cuando:

- El monto es 0 o inválido
- Las monedas de origen y destino son iguales
- Los parámetros no están completamente inicializados

### Error Boundary para Manejo de Errores

Implementación de un Error Boundary a nivel de aplicación que captura errores no manejados y proporciona una interfaz de recuperación amigable para el usuario, mejorando la experiencia de usuario en caso de fallos inesperados.

### Capa de Servicios Abstraída

La capa de servicios (`services/api.ts`) centraliza:

- Configuración de Axios (baseURL, timeout)
- Validación de parámetros antes de realizar llamadas
- Transformación de respuestas de la API

### Funciones para Cálculos

Las funciones de cálculo de conversión (`utils/currency.ts`) son funciones puras, testeables y sin efectos secundarios, facilitando el testing y la depuración.

### Query Keys Granulares

Uso de query keys descriptivas (`['exchange', from, to]`) que permiten caché granular por par de monedas, optimizando el rendimiento al evitar refetches innecesarios cuando se cambia entre pares ya consultados.

## 📄 Licencia

Este proyecto es parte de un challenge técnico.
