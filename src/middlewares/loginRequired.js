const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ mensagem: 'Não autorizado.' });

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.SECRET);
    const { id, email } = data;
    const user = await UserModel.findOne({ _id: id, email });

    if (!user) return res.status(401).json({ msg: 'Não autorizado.' });

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Sessão inválida.' });
    }
    return res.status(401).json({ msg: 'Não autorizado.' });
  }
};
