const cloudinary = require('cloudinary').v2;

const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    console.log('Cloudinary conectado 😎');
  } catch (error) {
    console.log('Error en la conexión con Cloudinary 🤬');
  }
};

module.exports = { connectCloudinary };
