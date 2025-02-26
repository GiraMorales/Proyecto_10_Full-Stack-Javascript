const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {
  if (!url || typeof url !== 'string') return; // Evita errores si la URL es undefined
  const imgSplited = url.split('/');
  console.log('URL dividida:', imgSplited); // Verifica que la URL se divide correctamente

  const folderName = imgSplited.slice(-2, -1)[0];
  const fileName = imgSplited.slice(-1)[0].split('.')[0];

  console.log('Folder:', folderName);
  console.log('File name:', fileName);

  const publicId = `${decodeURIComponent(folderName)}/${decodeURIComponent(
    fileName
  )}`;
  console.log('Public ID:', publicId); // Verifica que el public_id se vea bien
  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.error('Error al eliminar el archivo de Cloudinary:', error);
    } else {
      console.log('Archivo eliminado de Cloudinary:', result);
    }
  });
};

module.exports = { deleteFile };
