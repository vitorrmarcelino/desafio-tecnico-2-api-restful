const UserModel = require('../models/UserModel');

exports.index = async (req, res) => {
  try {
    const users = await UserModel.find().select('-senha');
    if (!users) return res.status(404).json({ mensagem: 'Nenhum usuário foi encontrado' });
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
  }
};

exports.search = async (req, res) => {
  try {
    const { search } = req.params;

    const users = await UserModel.find({
      $or: [
        { nome: { $regex: new RegExp(search, 'i') } },
        { email: { $regex: new RegExp(search, 'i') } },
      ],
    });

    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar os usuários' });
  }
};
