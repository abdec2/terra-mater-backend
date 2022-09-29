module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/collection/get_collection',
        handler: 'custom-collection.getCollection',
        config: {
            policies: [],
            middlewares: [],
        },
      },
    ],
  };
  