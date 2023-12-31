const { commonBlocks } = require("..");
const { get } = require('lodash');

const createComponentModel = async (dynamiczone = {}) => {
    const allComponents = strapi.components;
    const contentTypes = strapi.contentTypes;
    const contentTypeService = await strapi.plugin('content-type-builder').service("content-types")
    const userDefinedContentTypes = Object.keys(strapi.contentTypes)
        .map(uid => contentTypeService.formatContentType(strapi.contentTypes[uid]))
        .filter((model) => !model.plugin)


    function createComponentModelRecusrively(uid) {
        const getType = (schema, attrName) => get(schema, ["attributes", attrName, "type"])
        const getOtherInfos = (schema, arr) => get(schema, ["attributes", ...arr])

        const recursive = (schema) => {
            return Object.keys(schema['attributes'])
                .reduce((acc, current) => {
                    const attrType = getType(schema, current)
                    let value;
                    if (attrType === 'component') {
                        const componentUid = getOtherInfos(schema, [current, 'component'])
                        value = recursive(allComponents[componentUid])
                    }
                    if (attrType === 'dynamiczone') {
                        const components = getOtherInfos(schema, [current, 'components'])
                        value = components.reduce((ac, currentComponentUid) => {
                            const values = recursive(allComponents[currentComponentUid])
                            return {
                                ...ac,
                                ...values
                            }
                        }, {})

                    }
                    if (attrType === 'relation') {
                        const modelId = getOtherInfos(schema, [current, 'target'])
                        if (modelId && modelId !== uid) {
                            //these are parent entities as it reference to these entities via fk.
                            userDefinedContentTypes.find(obj => obj['uid'] == modelId) && (value = recursive(contentTypes[modelId]));//it should be only used defined stypes not generated by starpi - not considering it yet

                        }

                    }
                    if (attrType === 'media') {
                        value = {}
                    }

                    // value =  true;


                    return {
                        ...acc,
                        [current]: value
                    }

                }, {})
        }

        return recursive(allComponents[uid])
    }

    const dynamiczoneComponents = get(dynamiczone, ['components'], [])
    return dynamiczoneComponents.reduce((ac, currentComponentUid) => {
        const values = createComponentModelRecusrively(currentComponentUid)
        return {
            ...ac,
            ...values
        }
    }, {})




}

const getContentQueryObject = (obj) => {
    let result = []

    Object.keys(obj).forEach((key, index) => {
        if (typeof obj[key] == 'object') {
            result = [
                ...result,
                key,
                ...getContentQueryObject(obj[key]).map(s => `${key}.${s}`)//result.map(s => `${s}.${_getObjectKey(obj[key])}`)
            ]
        }
    })


    return result;

}

const getCommonPageContent = async (commonPageContentToBeIncluded = {}) => {
    try {        
        const _promises = Object.keys((commonPageContentToBeIncluded || {})).map(async (uid) => {
            const commonContentBlocks = commonPageContentToBeIncluded[uid]
            const _promises = commonContentBlocks.map(async (block) => {
                const componentModel = await createComponentModel(commonBlocks[block]);
                const queryValuesArrs = getContentQueryObject(componentModel);
                return queryValuesArrs.map(queryValue => `${block}.${queryValue}`)
            })
            const promiseValues = await Promise.all(_promises)
            return strapi.entityService.findMany('api::common-page.common-page', {
                filters: { uid }, populate: promiseValues.reduce((acc, promiseValue) => ([
                    ...acc,
                    ...promiseValue
                ]), [])
            })
        })
        const commonResults = (await Promise.all(_promises)).flatMap(value => value)
        return commonResults;
    } catch (error) {
        return Promise.reject('Error while getting content')
    }
}


module.exports = getCommonPageContent