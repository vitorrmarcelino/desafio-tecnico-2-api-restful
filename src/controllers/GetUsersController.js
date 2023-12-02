const UserModel = require('../models/UserModel');

exports.show = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userID }).select('-senha');
    if (!user) return res.status(404).json({ mensagem: 'Nenhum usuário foi encontrado' });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar usuário.' });
  }
};
