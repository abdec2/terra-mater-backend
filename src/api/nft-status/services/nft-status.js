'use strict';

/**
 * nft-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nft-status.nft-status');
