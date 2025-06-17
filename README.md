# Proyecto_10

FULL STACK JAVASCRIPT

Esta página es creada como un proyecto educativo.
Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para gestionar el proyecto.

# Descripcion de la pagina

Para poder entrar en la pagina el usuario se tiene que registrar, y iniciar su sesión, si no esta registrado la pagina te manda a registrarte.
En la pagina sin loguearte se puede ver la lista de eventos.
Los usuarios autenticados pueden crear eventos y confirmar asistencia, explorar los detalles de los eventos y la lista de asistentes que tenga.
Esta pagina tiene un loading para que mientras el usario espera, vea que la pagina esta trabajando.
Los eventos tiene titulo, una foto del evento, fecha del evento, ubicacion del evento, una descripcion del evento, y una lista de asistentes.
Los usuarios no logueados solo ven el titulo del evento, foto y fecha del evento.

## Despliegue

### Backend
- Crear archivo `.env` con las variables de entorno necesarias (ver sección Variables del entorno)
- Ejecutar:
npm install
npm run dev

## Endpoints

### Users

POST /api/v1/users/register: Registro de un nuevo usuario.
POST /api/v1/users/login: Inicio de sesión de un usuario.
GET /api/v1/users: Buscar lista de asistentes (requiere autenticación).
GET /api/v1/users/:id: Buscar un asistente (requiere autenticación).
PUT /api/v1/users/:id: Actualizar perfil de usuario (requiere autenticación).
DELETE /api/v1/users/:id: Borrar perfil de usuario (requiere autenticación).

### Eventos

GET /api/v1/eventos: Obtener todos los eventos (requiere autenticación).
POST /api/v1/eventos: Crear un evento (solo administradores).
PUT /api/v1/eventos/:id: Actualizar un evento, como lista de asistentes (solo administradores).
DELETE /api/v1/eventos/:id: Borrar evento y archivo asociado en Cloudinary (solo administradores).

## Funcionalidades

Subida de archivos a Cloudinary.
Eliminación de archivos asociados al borrar eventos.
Relación entre eventos y usuarios asistentes.
Autenticación con JWT.

## Tecnologías Utilizadas

Node.js
Express
MongoDB (Atlas)
Nodemon (para desarrollo)
Mongoose (modelado de datos)
Insomnia (para pruebas API)
Cloudinary (gestión de imágenes)
JWT (autenticación)
Multer (gestión de archivos para Cloudinary)

## Instalación

### Clonar repositorio

git clone https://github.com/GiraMorales/Proyecto_10_Full-Stack-Javascript.git

### Incializar un paquete de npm

npm init -y
npm install

### añadir los scripts

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}

### Variables del entorno

DATABASE_URL=mongodb
PORT=3000
JWT_SECRET=tu_clave_secreta
CLOUD_NAME=CLOUD_NAME
API_KEY=API_KEY
API_SECRET=API_SECRET


## Frontend

- Desarrollado en JavaScript Vanilla / React / etc.
- Arquitectura modular con componentes reutilizables.
- Manejo de rutas con hash routing.
- Integración con API RESTful para operaciones CRUD de eventos y usuarios.

## Estructura del Proyecto

/backend
/controllers # Lógica de negocio y manejo de peticiones
/models # Esquemas y modelos de base de datos (MongoDB/Mongoose)
/routes # Definición de endpoints de la API
/middlewares # Validaciones y autenticación JWT
index.js # Punto de entrada de la API

/frontend
/components # Componentes reutilizables (formularios, listas, etc.)
/pages # Vistas principales (Login, Registro, Eventos, etc.)
/services # Funciones para comunicación con backend (fetch API)
/styles # Archivos CSS
main.js # Script principal que controla la aplicación
index.html # Entrada del frontend


## Funcionalidades principales

- Registro y autenticación de usuarios con JWT.
- Creación, edición y eliminación de eventos (solo para usuarios con rol administrador).
- Visualización de eventos públicos para usuarios no autenticados.
- Confirmación de asistencia a eventos para usuarios autenticados.
- Visualización de lista de asistentes en cada evento.
- Gestión de perfiles de usuario (actualización y eliminación).
- Subida y eliminación de imágenes de eventos mediante Cloudinary.
- Protección de rutas y control de acceso según roles.
- Mensajes de error claros y validación en formularios.
- Interfaz amigable con carga visual mientras se obtienen datos.

## Problemas conocidos
- No hay validación avanzada en el frontend.
- No se implementó paginación en la lista de eventos.

**Despliegue**

Frontend: ([https://tu-front.vercel.[app](https://proyecto-10-full-stack-javascript-f.vercel.app/))
Backend: (](https://proyecto-10-full-stack-javascript-b.vercel.app/)https://tu-back.vercel.app)


## Futuras mejoras
- Implementar roles con más permisos detallados.
- Añadir filtros y búsqueda avanzada.
- Mejorar diseño responsive y accesibilidad.

## Contacto

Autor: Gira Morales Revelles
GitHub: https://github.com/GiraMorales
Email: gira.morales@gmail.com
