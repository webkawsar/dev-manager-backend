module.exports = ({ env }) => ({
    // ...
    email: {
      config: {
        provider: 'mailgun',
        providerOptions: {
          key: env('MAILGUN_SECRET_KEY'), // Required
          domain: env('MAILGUN_DOMAIN'), // Required
          
        },
        settings: {
          defaultFrom: 'web.kawsarahmed@gmail.com',
          defaultReplyTo: 'web.kawsarahmed@gmail.com',
          testAddress: 'kawsarahmed.dev@gmail.com',
        },
      },
    },
    // ...
  });