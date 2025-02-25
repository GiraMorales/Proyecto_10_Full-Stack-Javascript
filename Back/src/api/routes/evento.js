const {
  getEventos,
  getEventoById,
  postEvento,
  updateEvento,
  deleteEvento
} = require('../controllers/evento');

const eventosRouter = require('express').Router();

eventosRouter.get('/', getEventos);
eventosRouter.get('/:id', getEventoById);
eventosRouter.post('/', postEvento);
eventosRouter.put('/:id', updateEvento);
eventosRouter.delete('/:id', deleteEvento);

module.exports = eventosRouter;
