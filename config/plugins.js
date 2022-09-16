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
    // ...
  });
  