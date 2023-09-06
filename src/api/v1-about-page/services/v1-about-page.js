'use strict';

const { getOverideSingleType } = require('../../../common/api');

/**
 * v1-about-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::v1-about-page.v1-about-page', getOverideSingleType('api::v1-about-page.v1-about-page'));
