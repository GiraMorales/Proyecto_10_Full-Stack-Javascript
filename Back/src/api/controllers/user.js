const { User } = require('../models/user');

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
  } catch (error) {
    return res.status(400).json('error al buscar un usuario');
  }
};

const register = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al crear el usuario');
  }
};

const login = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al crear el usuario');
  }
};

const updateUser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al actualizar el usuario');
  }
};

const deleteUser = async (req, res, next) => {
  try {
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
