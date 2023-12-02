const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: [{
    numero: { type: String, required: false },
    ddd: { type: String, required: false },
  }],
  ultimo_login: {
    type: Date,
  },
}, { timestamps: { createdAt: 'data_criacao', updatedAt: 'data_atualizacao' } });

module.exports = mongoose.model('User', userSchema);
