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
- npm o yarn

## 🛠️ Instalación

1. Clonar el repositorio (o navegar al directorio del proyecto)

2. Instalar dependencias:

```bash
npm install
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

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea el build de producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint
- `npm run lint:fix` - Ejecuta ESLint y corrige errores automáticamente
- `npm run format` - Formatea el código con Prettier
- `npm run format:check` - Verifica el formato del código

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes React
├── hooks/          # Custom hooks
├── services/       # Servicios API
├── types/          # Tipos TypeScript
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
└── index.css       # Estilos globales (Tailwind)
```

## 🔌 API

La aplicación utiliza la API de [VATComply](https://www.vatcomply.com/documentation) para obtener las tasas de cambio de monedas.

## 📄 Licencia

Este proyecto es parte de un challenge técnico.
