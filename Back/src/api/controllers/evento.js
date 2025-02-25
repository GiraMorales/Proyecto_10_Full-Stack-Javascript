const { Evento } = require('../models/evento');

const getEventos = async (req, res, next) => {
  try {
    const eventos = await Evento.find();
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(400).json('error al buscar los eventos');
  }
};
const getEventoById = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al buscar el evento');
  }
};
const postEvento = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al crear el evento');
  }
};
const updateEvento = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al actualizar el evento');
  }
};
const deleteEvento = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error al borrar el evento');
  }
};

module.exports = {
  getEventos,
  getEventoById,
  postEvento,
  updateEvento,
  deleteEvento
};
