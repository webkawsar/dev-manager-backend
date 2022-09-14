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
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    // ...
  });