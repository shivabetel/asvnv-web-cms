'use strict';

const { getOverideSingleType } = require('../../../common/api');

/**
 * v1-home-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::v1-home-page.v1-home-page', getOverideSingleType('api::v1-home-page.v1-home-page'));
