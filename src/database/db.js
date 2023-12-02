const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@autenticacao-usuarios.ezkthz8.mongodb.net/?retryWrites=true&w=majority`,
  )
    .then(() => {
      console.log('Conectado ao banco de dados');
    }).catch((error) => {
      console.log('Erro ao conectar ao banco de dados');
    });
};
