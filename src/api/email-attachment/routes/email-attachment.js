module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/email-attachment',
     handler: 'email-attachment.sendEmail',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
