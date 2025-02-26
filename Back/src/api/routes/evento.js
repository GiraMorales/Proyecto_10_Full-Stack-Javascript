const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');

const {
  getEventos,
  getEventoById,
  postEvento,
  updateEvento,
  deleteEvento
} = require('../controllers/evento');

const eventosRouter = require('express').Router();

eventosRouter.get('/', [isAuth], getEventos);
eventosRouter.get('/:id', [isAuth], getEventoById);
eventosRouter.post(
  '/',
  [isAuth, isAdmin], // Autenticación y permisos primero
  upload.single('imagen'), // Subida de archivo
  (req, res, next) => {
    console.log('Archivo recibido:', req.file); // Depurar el archivo recibido
    next(); // Pasar al siguiente middleware (postEvento)
  },
  postEvento
);
eventosRouter.put('/:id', [isAuth, isAdmin], updateEvento);
eventosRouter.delete('/:id', [isAuth, isAdmin], deleteEvento);

module.exports = eventosRouter;
