const router = require('express').Router();

// Importando os Controllers
const CreateUserController = require('../controllers/CreateUserController');
const LoginUserController = require('../controllers/LoginUserController');
const GetUsersController = require('../controllers/GetUsersController');

// Middlewares
const loginRequired = require('../middlewares/loginRequired');

// Rotas
router.post('/register', CreateUserController.create);
router.post('/login', LoginUserController.login);
router.get('/', loginRequired, GetUsersController.index);
router.get('/:search', loginRequired, GetUsersController.search);

module.exports = router;
