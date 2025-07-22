const { isAuth } = require('../../middlewares/auth');
const {
  getUsers,
  getUserById,
  getEventosDeUsuario,
  register,
  updateUser,
  deleteUser,
  login
} = require('../controllers/user');

const usersRouter = require('express').Router();

usersRouter.get('/', [isAuth], getUsers);
usersRouter.get('/:id', [isAuth], getUserById);
usersRouter.get('/:id/eventos', [isAuth], getEventosDeUsuario);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.put('/:id', [isAuth], updateUser);
usersRouter.delete('/:id', [isAuth], deleteUser);

module.exports = usersRouter;
