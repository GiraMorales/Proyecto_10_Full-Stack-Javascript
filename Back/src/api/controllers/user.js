const { generateSing } = require('../../utils/jwt');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Evento = require('../models/evento');

const getUsers = async (req, res, next) => {
  try {
    const usuarios = await User.find();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json('error al buscar los usuarios');
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('error al buscar un usuario');
  }
};

const getEventosDeUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventos = await Evento.find({ asistentes: id });
    return res.status(200).json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos del usuario:', error);
    return res
      .status(500)
      .json({ message: 'Error al obtener eventos del usuario' });
  }
};

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated) {
      return res.status(400).json('Usuario ya resgistrado');
    }
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      rol: 'user'
    });

    const user = await newUser.save();
    const token = generateSing(user._id);

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).json('error al crear el usuario');
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json('Usuario o contraseña incorrectos');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json('Usuario o contraseña incorrectos');
    }

    const token = generateSing(user._id);

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).json('error al encontrar el usuario');
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) {
      return res
        .status(400)
        .json('No puedes modificar otro usuario que no sea el tuyo');
    }
    const newUser = new User(req.body);
    newUser._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, newUser, {
      new: true
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json('error al actualizar el usuario');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: 'El usuario ha sido eliminado con exito.',
      usuarioEliminado: user
    });
  } catch (error) {
    return res.status(400).json('error al borrar el usuario');
  }
};

module.exports = {
  getUsers,
  getUserById,
  getEventosDeUsuario,
  register,
  login,
  updateUser,
  deleteUser
};
