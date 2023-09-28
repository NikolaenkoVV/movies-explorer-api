const routerUsers = require('express').Router();
const { getCurrentUserInfo, updateUserInfo } = require('../controllers/users');
const { validationJoiUpdateUser } = require('../utils/validationsJoi');

routerUsers.get('/users/me', getCurrentUserInfo);
routerUsers.patch('/users/me', validationJoiUpdateUser, updateUserInfo);

module.exports = routerUsers;
