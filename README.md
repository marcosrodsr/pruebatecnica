# Evaluación 360 de Empleados

Este proyecto es una aplicación de Evaluación 360 de Empleados desarrollada con Next.js y TypeScript. La aplicación permite a los usuarios crear, editar y gestionar empleados, formularios de evaluación y evaluaciones. Proporciona un panel de administración para los administradores y una página de perfil para que los usuarios vean su historial de evaluaciones.

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (v14 o superior)
- npm (v6 o superior)
- Git

### Clonación del Repositorio

Clona el repositorio del proyecto desde GitHub a tu máquina local:

```bash
git clone https://github.com/marcosrodsr/pruebatecnica.git
cd pruebatecnica

Instalación de Dependencias
Una vez clonado el repositorio, instala las dependencias del proyecto:
npm install

Iniciar el Servidor API
Este proyecto utiliza json-server para simular una API RESTful. Para iniciar el servidor API:
npm run start:api

Iniciar el Servidor de Desarrollo
Después de iniciar el servidor API, inicia el servidor de desarrollo de Next.js:
npm run dev

ESTRUCTURA:

.
├── public/                   # Archivos estáticos
├── src/
│   ├── app/                  # Páginas y rutas API de Next.js
│   │   ├── admin/            # Página de administración
│   │   ├── login/            # Página de inicio de sesión
│   │   ├── profile/          # Página de perfil del usuario
│   │   ├── register/         # Página de registro
│   │   ├── dashboard/        # Panel de control
│   │   
│   ├── components/           # Componentes reutilizables de React
│   ├── context/              # Contexto de React para la gestión de estado
│   ├── styles/               # Estilos globales
│   ├── types.ts              # Tipos de TypeScript
│   ├── __tests__/            # Archivos de prueba
│   └── jest.setup.ts         # Archivo de configuración de Jest
├── db.json                   # Datos del servidor REST API falso
├── jest.config.js            # Configuración de Jest
├── next.config.js            # Configuración de Next.js
├── package.json              # Dependencias y scripts del proyecto
├── README.md                 # Documentación del proyecto
└── tsconfig.json             # Configuración de TypeScript

Decisiones de Diseño
Arquitectura Basada en Componentes: Se utilizó una arquitectura basada en componentes para mejorar la reutilización y el mantenimiento del código.
Gestión de Estado: Se implementó Context API para gestionar el estado global en la aplicación, facilitando la comunicación entre componentes.
Diseño Modular: Cada funcionalidad se agrupa en su propio directorio dentro de src/app, lo que facilita la navegación y el mantenimiento del código.
Pruebas: Jest y React Testing Library se utilizaron para asegurar la calidad del código mediante pruebas unitarias e integradas.

Ejecución de Pruebas
Este proyecto utiliza Jest y Testing Library para realizar pruebas unitarias e integradas.

Ejecución de Pruebas
Para ejecutar todas las pruebas:
npm test
Esto ejecutará todas las pruebas definidas en la carpeta __tests__.

Pruebas Unitarias
Las pruebas unitarias verifican el comportamiento de componentes individuales. Estas se encuentran en la carpeta src/__tests__/.

Pruebas de Integración
Las pruebas de integración verifican cómo interactúan varios componentes entre sí para asegurar que el flujo general de la aplicación funcione correctamente.