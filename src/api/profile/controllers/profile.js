"use strict";

/**
 * profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", ({ strapi }) => {
  return {
    async create(ctx) {
      try {
        const { user } = ctx.state;
        const files = ctx.request.files;

        const parsedData = JSON.parse(ctx?.request?.body?.data);
        parsedData.user = user.id;

        const response = await strapi
          .service("api::profile.profile")
          .create({ data: parsedData, files, populate: "*" });

        // const userResponse = await strapi.query("plugin::users-permissions.user").update({
        //   where: { id: user.id },
        //   data: {
        //     isProfile: true,
        //   },
        //   populate: true,
        // });
        // console.log(userResponse, 'userResponse');

        return response;
      } catch (error) {
        console.log(error, "error");
        ctx.internalServerError("Internal Server Error");
      }
    },
  };
});
