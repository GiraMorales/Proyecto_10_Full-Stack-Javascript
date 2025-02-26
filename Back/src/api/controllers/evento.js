const { deleteFile } = require('../../utils/deleteFile');
const { Evento } = require('../models/evento');

const getEventos = async (req, res, next) => {
  try {
    const eventos = await Evento.find().populate('relatedUsers');
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(400).json('error al buscar los eventos');
  }
};
const getEventoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findById(id).populate('relatedUsers');
    return res.status(200).json(evento);
  } catch (error) {
    console.log(error);

    return res.status(400).json('error al buscar el evento');
  }
};
const postEvento = async (req, res, next) => {
  try {
    const newEvento = new Evento(req.body);
    newEvento.verified = req.user?.rol === 'admin';

    const evento = await newEvento.save();
    return res.status(201).json(evento);
  } catch (error) {
    console.log(error);

    return res.status(400).json('error al crear el evento');
  }
};
const updateEvento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newEvento = new Evento(req.body);
    newEvento._id = id;
    const eventoUpdated = await Evento.findByIdAndUpdate(id, newEvento, {
      new: true
    });

    Object.assign(newEvento, req.body);

    if (req.file) {
      // Borra la imagen anterior si existía
      if (newEvento.imagen) {
        deleteFile(newEvento.imagen);
      }
      newEvento.imagen = req.file.path;
    }

    return res.status(200).json(eventoUpdated);
  } catch (error) {
    return res.status(400).json('error al actualizar el evento');
  }
};

const deleteEvento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByIdAndDelete(id);
    if (evento.imagen) {
      deleteFile(evento.imagen);
    }
    return res.status(200).json({
      mensaje: 'El evento ha sido eliminado con exito.',
      eventoEliminado: evento
    });
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
