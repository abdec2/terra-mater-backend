'use strict';

/**
 * nft-v1 controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::nft-v1.nft-v1', ({strapi}) => ({
    async find(ctx) {
        const { page } = ctx.query;
        const limit = 24;

        const entity = await strapi.db.query('api::nft-v1.nft-v1').findMany({
            offset: (page - 1) * limit,
            limit: limit,
            populate: {
                collection: {
                    populate: ['category', 'banner', 'feature_img']
                },
                nft_status: '*'
            }
        });

        // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return entity;
    }, 
    async findOne(ctx) {
        const {id} = ctx.params;

        const entity = await strapi.entityService.findOne('api::nft-v1.nft-v1', id, {
            populate: {
                collection: {
                    populate: ['category', 'banner', 'feature_img']
                },
                nft_status: '*'
            }
        })
        const props = await strapi.entityService.findMany('api::nft-prop.nft-prop', {
            filters: {
                nft_v_1: id
            }
        })
        return {...entity, props};
    }
}));
