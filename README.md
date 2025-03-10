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

## Endpoints

### Users

POST /api/v1/users/register: Registro de un nuevo usuario.
POST /api/v1/users/login: Inicio de sesión de un usuario.
GET /api/v1/users: Buscar lista de asistentes si esta autenticado.
GET /api/v1/users: Buscar un asistentes si esta autenticado.
PUT /api/v1/users/:id: Actualizar tu perfil de usuario si esta autenticado.
DEL /api/v1/users/:id: Borrar tu perfil de usuario si esta autenticado.

### Eventos

GET /api/v1/eventos: Obtener todos los eventos si esta autenticado.
POST /api/v1/eventos: Crear un evento, si es administrador.
PUT /api/v1/eventos/:id: Actualizar un evento, como lista de asistentes, si es administrador.
DELETE /api/v1/eventos/:id: Borrar el evento y su archivo asociado en Cloudinary, si es administrador.

## Funcionalidades

Subida de archivos a Cloudinary: Los eventos permiten almacenar archivos multimedia en Cloudinary.
Eliminación de archivos: Cuando se elimina un documento de la base de datos, también se elimina el archivo correspondiente en Cloudinary.
Relación entre colecciones: Los eventos estan relacionados con los usuarios que van a ir al evento.
Seguridad: Implementación de autenticación con JWT.

## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB(Atlas)**
- **Nodemon** (me permite tener el proyecto abierto todo el rato)
- **Mongoose** (para la interación con la base de datos)
- **Insomnia** (para realizar pruebas de API)
- **Cloudinary** (para la gestión de imágenes)
- **JWT** (para autenticación)
- **Multer** (para gestionar imagenes con cloudinary)

## Instalación

### Se clona este repositorio

- https://github.com/GiraMorales/Proyecto_10_Full-Stack-Javascript.git

### Incializar un paquete de npm

- npm init -y

### añadir los scripts

`Para ejecutar el fichero  index.js`

- "start": "node index.js"

`Para levantar la base de datos`

- "dev": "nodemon index.js"

### Variables del entorno

DATABASE_URL=mongodb
PORT=3000
JWT_SECRET=tu_clave_secreta
CLOUD_NAME=CLOUD_NAME
API_KEY=API_KEY
API_SECRET=API_SECRET
