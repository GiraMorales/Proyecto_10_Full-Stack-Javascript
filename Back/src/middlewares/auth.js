const { User } = require('../api/models/user');
const { verifyjwt } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json('No estás autorizado');
    }
    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyjwt(parsedToken);
    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json('No estas autorizado');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'Acción no permitida. Se requiere autenticación.'
      });
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyjwt(parsedToken);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (user.rol !== 'admin') {
      return res.status(403).json({
        message: 'Esta acción sólo la pueden realizar los administradores'
      });
    }
    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Error en la verificación del token o rol', error });
  }
};

module.exports = { isAuth, isAdmin };
