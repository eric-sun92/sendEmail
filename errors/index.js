const CustomAPIError = require("./CustomAPIError");
const BadRequestError = require("./badRequest");
const UnAuthenticatedError = require("./unAuthenticated");
const NotFoundError = require("./notFound");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
};
