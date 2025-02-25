const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    portada: { type: String, required: true },
    fecha: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: false },
    relatedUsers: [
      { type: mongoose.Types.ObjectId, required: false, ref: 'user' }
    ]
  },
  {
    timestamps: true,
    collection: 'eventos'
  }
);

const Evento = mongoose.model('eventos', eventoSchema, 'eventos');
module.exports = { Evento };
