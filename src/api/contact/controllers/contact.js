'use strict';

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({strapi}) => {
    return {
        async delete(ctx) {
            try {

                const {id} = ctx.params;
                const {user} = ctx.state;

                const contact = await strapi.service('api::contact.contact').findOne(+id, {
                    populate: 'author'
                });

                if(!contact) return ctx.notFound('Contact is not found to be deleted');
                if(contact.author.id !== user.id) return ctx.unauthorized('You are not the owner of the contact');

                const response = await super.delete(ctx);
                return response;
                    
            } catch (error) {
                ctx.internalServerError('Unknown error');
            }
        },
        async create(ctx) {
            try {

                const {user} = ctx.state;
                ctx.request.body.data.author = user.id;

                const response = await super.create(ctx);
                return response;
                
            } catch (error) {
                ctx.internalServerError('Unknown error');
            }
        },
        async update(ctx) {
            try {

                const {id} = ctx.params;
                const {user} = ctx.state;

                const contact = await strapi.service('api::contact.contact').findOne(+id, {
                    populate: 'author'
                });

                if(!contact) return ctx.notFound('Contact is not found to be update');
                if(contact.author.id !== user.id) return ctx.unauthorized('You are not the owner of the contact to update');

                const response = await super.update(ctx);
                return response;

            } catch (error) {
                ctx.internalServerError('Unknown error');
            }
        }
    }
});
