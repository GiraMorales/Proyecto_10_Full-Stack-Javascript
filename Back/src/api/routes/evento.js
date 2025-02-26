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
eventosRouter.post('/', [isAuth, isAdmin], postEvento);
eventosRouter.put('/:id', [isAuth, isAdmin], updateEvento);
eventosRouter.delete('/:id', [isAuth, isAdmin], deleteEvento);

module.exports = eventosRouter;
