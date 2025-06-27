const { deleteFile } = require('../../utils/deleteFile');
const Evento = require('../models/evento');

const getEventos = async (req, res, next) => {
  try {
    const eventos = await Evento.find().populate(
      'relatedUsers',
      'userName email'
    );
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
    if (req.file) {
      newEvento.imagen = req.file.path;
    }
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
    const eventoExistente = await Evento.findById(id);
    if (!eventoExistente) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    if (req.file && eventoExistente.imagen) {
      deleteFile(eventoExistente.imagen);
    }
    const eventoActualizado = {
      ...req.body,
      imagen: req.file ? req.file.path : eventoExistente.imagen
    };
    const eventoUpdated = await Evento.findByIdAndUpdate(
      id,
      eventoActualizado,
      {
        new: true
      }
    );

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

asistirEvento = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id; // viene del middleware de auth

    const evento = await Evento.findById(eventId);
    if (!evento)
      return res.status(404).json({ message: 'Evento no encontrado' });

    if (evento.asistentes.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'Ya estás apuntado a este evento' });
    }

    evento.asistentes.push(userId);
    await evento.save();

    res.json({ message: 'Asistencia registrada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

cancelarAsistenciaEvento = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const evento = await Evento.findById(eventId);
    if (!evento)
      return res.status(404).json({ message: 'Evento no encontrado' });

    evento.asistentes = evento.asistentes.filter(
      (id) => id.toString() !== userId.toString()
    );
    await evento.save();

    res.json({ message: 'Asistencia cancelada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  getEventos,
  getEventoById,
  postEvento,
  updateEvento,
  deleteEvento,
  asistirEvento,
  cancelarAsistenciaEvento
};
