const router = require('express').Router();
const {
  validationJoiCreateUser,
  validationJoiLoginUser,
} = require('../utils/validationsJoi');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.post('/signup', validationJoiCreateUser, createUser);
router.post('/signin', validationJoiLoginUser, loginUser);

router.use(auth);

router.use(routerUsers);
router.use(routerMovies);

router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
