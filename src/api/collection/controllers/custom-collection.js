'use strict';


/**
 * A set of functions called "actions" for `custom-collection`
 */

module.exports = {
  getCollection: async (ctx, next) => {
    try {
      const entries = await strapi.entityService.findMany('api::collection.collection', {
        populate: ['category', 'banner', 'feature_img'],
      });
      return entries;

      
    } catch (err) {
      ctx.body = err;
    }
  }
};
