const router = require('express').Router();

// Importando os Controllers
const CreateUserController = require('../controllers/CreateUserController');
const LoginUserController = require('../controllers/LoginUserController');
const IndexUsersController = require('../controllers/IndexUsersController');

// Middlewares
const loginRequired = require('../middlewares/loginRequired');

// Rotas
router.post('/register', CreateUserController.create);
router.post('/login', LoginUserController.login);
router.get('/', loginRequired, IndexUsersController.index);

module.exports = router;
