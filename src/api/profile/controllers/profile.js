"use strict";

/**
 * profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", ({ strapi }) => {
  return {
    async create(ctx) {
      try {
        const { id } = ctx.state.user;
        ctx.query = { ...ctx.query, populate: "*" };
        const data = JSON.parse(ctx.request?.body?.data);
        data.user = id;
        ctx.request.body = { ...ctx.request?.body, data: JSON.stringify(data) };
        const response = await super.create(ctx);
        return response;
      } catch (error) {
        ctx.internalServerError("Internal Server Error");
      }
    }
  };
});
