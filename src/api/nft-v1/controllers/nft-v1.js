'use strict';

/**
 * nft-v1 controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::nft-v1.nft-v1', ({strapi}) => ({
    async find(ctx) {
        let { page, collectionId } = ctx.query;
        console.log(page)
        if(page === undefined) {
            page = 1;
        }
        const limit = 24;
        const query = {
            orderBy: 'id',
            offset: (page - 1) * limit,
            limit: limit,
            populate: {
                collection: {
                    populate: ['category', 'banner', 'feature_img']
                },
                nft_status: '*'
            }
        };

        if (collectionId !== undefined) {
            query.where = {
                collection: collectionId
            };
        }
        const [entity, count] = await strapi.db.query('api::nft-v1.nft-v1').findWithCount(query);
        // const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return {data: entity, meta: {page, pageSize: limit, pageCount: Math.ceil(count / limit), total: count}};
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
    }, 
    async findWithFilters(ctx) {
        const { categories, status, collections, page } = ctx.query;
        const limit = 100;
        const conditions = [];
        

        if(categories !== undefined) {
            conditions.push({
                collection: {
                    category: {
                        id: {
                            $in: JSON.parse(categories)
                        }
                    }
                }
            });
        }

        if(status !== undefined) {
            conditions.push({
                nft_status: {
                    id: {
                        $in: JSON.parse(status)
                    }
                }
            });
        }

        if(collections !== undefined) {
            conditions.push({
                collection: {
                    id: {
                        $in: JSON.parse(collections)
                    }
                }
            });
        }

        const query = {
            orderBy: 'id',
            offset: (page - 1) * limit,
            limit: limit,
            populate: {
                collection: {
                    populate: ['category', 'banner', 'feature_img']
                },
                nft_status: '*'
            }
        };
        if(conditions.length > 0) {
            query.where = {
                $and: conditions
            }
        }
        const entity = await strapi.db.query('api::nft-v1.nft-v1').findMany(query);
        return entity;
    }
}));
