const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/UserModel');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).json({ mensagem: 'Preencha todos os campos!' });

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ mensagem: 'Usuário inválido.' });

  const isValidPassword = await bcryptjs.compare(senha, user.senha);
  if (!isValidPassword) return res.status(404).json({ mensagem: 'Senha inválida.' });

  try {
    user.ultimo_login = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, {
      expiresIn: Number(process.env.EXPIRATION),
    });

    return res.json({
      id: user._id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao fazer o login.' });
  }
};
