const { createComponentModel, getContentQueryObject } = require('../../utils');

const getOverideSingleType = (modelId) => ({strapi}) => ({
    async find(params) {
        try {
            const { populate, processCommonContents = 1 } = params
            if (!populate) {
                const modelAttributes = await createComponentModel(modelId);
                const queryValues = getContentQueryObject(modelAttributes);
                params['populate'] = queryValues;
            }
           
            const result = await super.find(params);
            return result;

        } catch (error) {
            return Promise.reject('Error while getting content')
        }
    }
})


const getOverideCollectionType = (modelId) => ({strapi}) => ({
    async find(params = {}) {
        try {
            const { populate, processCommonContents = 1 } = params
            if (!populate) {
                const modelAttributes = await createComponentModel(modelId);
                const queryValues = getContentQueryObject(modelAttributes);
                params['populate'] = queryValues;
            }

            const queryResult = await super.find(params);
            return queryResult;


        } catch (error) {
            return Promise.reject('Error while getting content')
        }
    }
})


const processAccessoryBlock = (data) => {
    return  (data || []).map(accesoryBlock => {
        accesoryBlock['accessories'] = (accesoryBlock['accessories'] || []).map(obj => {
            const jioAccessoryOverride = obj['jioAccessoryOverride']
            const jioAccessory = obj['accessory']
            if (jioAccessoryOverride && jioAccessory) {
                Object.keys(jioAccessoryOverride).forEach(key => {
                    jioAccessoryOverride[key] && (obj.accessory[key] = jioAccessoryOverride[key])
                })
            }

            return obj;

        })
        return accesoryBlock;
    })
}

module.exports = {
    getOverideSingleType,
    getOverideCollectionType,
    processAccessoryBlock
}