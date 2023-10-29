const movieModel = require('../models/movie');
const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const getAllMovies = (req, res, next) => {
  const userId = req.user._id;
  movieModel
    .find({ owner: userId })
    .then((movies) => {
      res.status(STATUS_OK).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      res.status(STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  movieModel
    .findOne({ movieId, owner: userId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      // if (userId !== movie.owner.toString()) {
      //   throw new ForbiddenError('Разрешено удалять только свои фильмы');
      // }
      return movieModel.deleteOne(movie);
    })
    .then(() => res.status(STATUS_OK).send({ message: 'Фильм был удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
