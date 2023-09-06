'use strict';

const { getOverideSingleType } = require('../../../common/api');

/**
 * v1-schemes-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::v1-schemes-page.v1-schemes-page', getOverideSingleType('api::v1-schemes-page.v1-schemes-page'));
