'use strict';

const { getOverideSingleType } = require('../../../common/api');

/**
 * v1-events-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::v1-events-page.v1-events-page', getOverideSingleType('api::v1-events-page.v1-events-page'));
