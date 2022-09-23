'use strict';

/**
 * user-avatar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-avatar.user-avatar');
