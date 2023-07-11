const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
    const url = parse(env("PRODUCTION_URL"));
    console.log(url, 'url')

    return {
        host: env('PRODUCTION_HOST'),
        port: env.int('PORT'),
        app: {
          keys: env.array('APP_KEYS'),
        },
      }
};
  