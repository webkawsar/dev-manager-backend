module.exports = ({ env }) => ({
    host: env('PRODUCTION_HOST'),
    port: env.int('PORT'),
    app: {
      keys: env.array('APP_KEYS'),
    },
  });
  