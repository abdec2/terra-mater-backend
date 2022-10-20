module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/collections/get_collection',
        handler: 'custom-collection.getCollection',
        config: {
            policies: [],
            middlewares: [],
        },
      },
    ],
  };
  