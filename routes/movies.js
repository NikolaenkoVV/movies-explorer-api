const routerMovies = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validationJoiCreateMovie,
  validationJoiDeleteMovie,
} = require('../utils/validationsJoi');

routerMovies.get('/movies', getAllMovies);
routerMovies.post('/movies', validationJoiCreateMovie, createMovie);
routerMovies.delete('/movies/:movieId', validationJoiDeleteMovie, deleteMovie);

module.exports = routerMovies;
