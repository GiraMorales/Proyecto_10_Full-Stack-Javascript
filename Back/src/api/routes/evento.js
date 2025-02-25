const { isAuth, isAdmin } = require('../../middlewares/auth');
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
eventosRouter.post('/', [isAdmin], postEvento);
eventosRouter.put('/:id', [isAdmin], updateEvento);
eventosRouter.delete('/:id', [isAdmin], deleteEvento);

module.exports = eventosRouter;
