const UserModel = require('../models/UserModel');

exports.index = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) return res.status(404).json({ mensagem: 'Nenhum usuário foi encontrado' });
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
  }
};
