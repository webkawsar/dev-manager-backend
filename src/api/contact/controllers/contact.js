'use strict';

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({strapi}) => {
    return {
        async delete(ctx) {

            try {

                            // console.log(ctx, 'ctx');
            // console.log(ctx.state, 'state');
            // console.log(ctx.state.user, 'user');
            // console.log(ctx.params, 'params');
            // console.log(ctx.request.body, 'body');

            const {id} = ctx.params;
            const {user} = ctx.state;

            ctx.query = { ...ctx.query, populate: 'author' }
            const {data} = await super.findOne(ctx);
            const {id: contactAuthorId} = data?.attributes?.author?.data;
            
            const contact = await strapi.entityService.findOne('api::contact.contact', +id, {
                populate: 'author'
            });

            // const contact = await strapi.service('api::contact.contact').findOne(+id, {
            //     populate: 'author'
            // });

            console.log(contact, 'contact');


            // const response = await super.delete(ctx);
            // return response;
                
            } catch (error) {
                
                console.log(error, 'error');
            }
        }
    }
});
