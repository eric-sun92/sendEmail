require("dotenv").config();
const { UnAuthenticatedError } = require("../errors");
const jwt = require("json-web-token");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Not authorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jtw.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Not authorized");
  }
};

module.exports = authenticate;
