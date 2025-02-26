const { generateSing } = require('../../utils/jwt');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

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
    return res.status(201).json(user);
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
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSing(user._id);
      return res.status(200).json({ token, user });
    }
    return res.status(404).json('Usuario o contraseña incorrectos');
  } catch (error) {
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
  register,
  login,
  updateUser,
  deleteUser
};
