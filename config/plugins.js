module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'abdec2@gmail.com',
            pass: 'btvekjidnselujqk'
          }
        },
        settings: {
          defaultFrom: 'abdec2@gmail.com',
          defaultReplyTo: 'abdec2@gmail.com',
        },
      },
    },
    'webthree-auth': {
      enabled: true,
      resolve: './src/plugins/webthree-auth'
    },
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },  
  });
  