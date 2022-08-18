const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, Please try again later :(",
  };
  if (err.name === "ValidationError") {
    customError.statusCode = 400;
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
  }

  if (err.name === "CastError") {
    (customError.statusCode = 404),
      (customError.msg = `No item found with id ${err.value}`);
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
