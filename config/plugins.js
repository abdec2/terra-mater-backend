module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.mail.us-east-1.awsapps.com',
          port: 465,
          secure: true,
          auth: {
            user: 'info@terramaternfts.com',
            pass: 'j5oxpBN8eYo2'
          }
        },
        settings: {
          defaultFrom: 'info@terramaternfts.com',
          defaultReplyTo: 'info@terramaternfts.com',
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
  