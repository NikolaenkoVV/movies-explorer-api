const STATUS_OK = 200;
const STATUS_CREATED = 201;

const regexLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const { SECRET_JWT, NODE_ENV, MONGODB_URL } = process.env;

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  regexLink,
  SECRET_JWT: NODE_ENV === 'production' ? SECRET_JWT : 'dev-secret',
  MONGODB_URL: NODE_ENV === 'production' ? MONGODB_URL : 'mongodb://127.0.0.1/bitfilmsdb',
};
