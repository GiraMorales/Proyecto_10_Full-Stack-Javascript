const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado a la Base de Datos 📚');
  } catch (error) {
    console.error('❌ Error al conectar a la BD:', error);
  }
};

module.exports = { connectDB };
