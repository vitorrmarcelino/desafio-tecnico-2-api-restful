const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const UserModel = require('../models/UserModel');
const validatePhoneNumber = require('../utils/validatePhoneNumber');

exports.create = async (req, res) => {
  const {
    nome,
    email,
    senha,
    telefones,
  } = req.body;

  if (!nome || !email || !senha || !telefones) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos!' });
  }

  const isEmail = validator.isEmail(email);
  if (!isEmail) return res.status(400).json({ mensagem: 'Insira um e-mail válido!' });

  const emailExists = await UserModel.findOne({ email });
  if (emailExists) return res.status(400).json({ mensagem: 'E-mail já existente!' });

  let hasInvalidPhone;
  telefones.forEach((telefone) => {
    const { numero, ddd } = telefone;
    const validNumber = validatePhoneNumber(numero, ddd);
    if (!validNumber) {
      hasInvalidPhone = true;
    }
  });
  if (hasInvalidPhone) return res.status(400).json({ mensagem: 'Algum número de telefone inválido' });

  const passwordHash = await bcryptjs.hash(senha, 8);

  try {
    const newUser = await UserModel.create({
      nome, email, senha: passwordHash, telefones, ultimo_login: new Date(),
    });
    const token = jwt.sign({ id: newUser._id, email }, process.env.SECRET, {
      expiresIn: Number(process.env.EXPIRATION),
    });
    return res.json({
      id: newUser._id,
      data_criacao: newUser.data_criacao,
      data_atualizacao: newUser.data_atualizacao,
      ultimo_login: newUser.ultimo_login,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao criar o usuário.' });
  }
};
