module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/dump-nft',
     handler: 'dump-nft.importData',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
