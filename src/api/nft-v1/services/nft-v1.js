'use strict';

/**
 * nft-v1 service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nft-v1.nft-v1');
