'use strict';


/**
 * A set of functions called "actions" for `custom-collection`
 */

module.exports = {
  getCollection: async (ctx, next) => {
    try {
      const { id } = ctx.query;
      const query = {
        populate: ['category', 'banner', 'feature_img'],
      }
      if (id !== undefined) {
        query.filters= {
          id: id
        }
      }
      const entries = await strapi.entityService.findMany('api::collection.collection', query );
      return entries;

      
    } catch (err) {
      ctx.body = err;
    }
  }
};
