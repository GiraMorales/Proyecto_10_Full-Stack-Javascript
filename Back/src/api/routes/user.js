const {
  getUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login
} = require('../controllers/user');

const usersRouter = require('express').Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

module.exports = usersRouter;
