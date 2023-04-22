"use strict";

/**
 * contact controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contact.contact", ({ strapi }) => {
  return {
    async delete(ctx) {
      try {
        const { id } = ctx.params;
        const { user } = ctx.state;

        const contact = await strapi
          .service("api::contact.contact")
          .findOne(+id, {
            populate: "author",
          });

        if (!contact) return ctx.notFound("Contact is not found to be deleted");
        if (contact?.author?.id !== user?.id)
          return ctx.unauthorized("You are not the owner of the contact");

        const response = await super.delete(ctx);
        return response;
      } catch (error) {
        ctx.internalServerError("Internal server error");
      }
    },
    async create(ctx) {
      try {
        const { id } = ctx.state.user;
        ctx.query = { ...ctx.query, populate: "*" };
        const data = JSON.parse(ctx.request?.body?.data);
        data.author = id;
        ctx.request.body = { ...ctx.request?.body, data: JSON.stringify(data) };
        const response = await super.create(ctx);
        return response;
      } catch (error) {
        ctx.internalServerError("Internal Server Error");
      }
    },
    async update(ctx) {
      try {
        const { id } = ctx.params;
        const { user } = ctx.state;
        const files = ctx.request?.files;
        const parsedData = JSON.parse(ctx?.request?.body?.data);

        const contact = await strapi
          .service("api::contact.contact")
          .findOne(+id, {
            populate: "author",
          });

        if (!contact) return ctx.notFound("Contact is not found to be update");
        if (contact?.author?.id !== user?.id)
          return ctx.unauthorized(
            "You are not the owner of the contact to update"
          );

        const response = await strapi.entityService.update(
          "api::contact.contact",
          id,
          {
            data: parsedData,
            files,
            populate: "*",
          }
        );

        return response;
      } catch (error) {
        ctx.internalServerError("Internal Server Error");
      }
    },
  };
});
