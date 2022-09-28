module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', 'd9b0df66ff97a666027e665707b4e3e7'),
  },
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5ed28f620e04b5d03a4689c6ee0457f2'),
  },
});
