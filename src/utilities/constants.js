const dotenv = require ('dotenv');

dotenv.config();

class Constants {
  static env = process.env.NODE_ENV;
  static port = process.env.PORT;

  static database = {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };

  static timezone = process.env.TIMEZONE;
  static language = process.env.LANGUAGE;

  static auth = {
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  }
}

module.exports = Constants;