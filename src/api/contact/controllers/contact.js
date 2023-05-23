"use strict";

/**
 * contact controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contact.contact", ({ strapi }) => {
  return {
    async create(ctx) {
      try {
        const { id } = ctx.state.user;
        ctx.query = { ...ctx.query, populate: "*" };
        const data = JSON.parse(ctx.request?.body?.data);
        data.author = id;
        ctx.request.body = { ...ctx.request?.body, data: JSON.stringify(data) };
        const response = await super.create(ctx);
        console.log(ctx.request?.body, 'ctx.request?.body')
        console.log(response, 'response')

        return response;
      } catch (error) {
        ctx.internalServerError("Internal Server Error");
      }
    },
    async update(ctx) {
      try {
        const { id } = ctx.params;
        const { user } = ctx.state;
        ctx.query = { ...ctx.query, populate: "*" };

        const contact = await strapi
          .service("api::contact.contact")
          .findOne(+id, {
            populate: ["author", "image"],
          });

        if (!contact) return ctx.notFound("Contact is not found to be update");
        if (contact?.author?.id !== user?.id) {
          return ctx.unauthorized(
            "You are not the owner of the contact to update"
          );
        }

        // at first remove old file then update contact
        if (Object.keys(ctx.request?.files).length) {
          await strapi.plugins["upload"].services.upload.remove(contact?.image);
        }

        const response = await super.update(ctx);
        return response;
      } catch (error) {
        ctx.internalServerError("Internal Server Error");
      }
    },
    async delete(ctx) {
      try {
        const { id } = ctx.params;
        const { user } = ctx.state;

        const contact = await strapi
          .service("api::contact.contact")
          .findOne(+id, {
            populate: ["author", "image"],
          });

        if (!contact) return ctx.notFound("Contact is not found to be delete");
        if (contact?.author?.id !== user?.id) {
          return ctx.unauthorized("You are not the owner of the contact");
        }

        // at first delete contact image then contact data
        if(contact?.image) {
          
          await strapi.plugins["upload"].services.upload.remove(contact?.image);
        }

        const response = await super.delete(ctx);
        return response;
      } catch (error) {
        ctx.internalServerError("Internal server error");
      }
    },
  };
});
