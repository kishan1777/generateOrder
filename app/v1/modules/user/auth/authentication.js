const jwt = require("jsonwebtoken");
const config = require("../../../../../config");
const Session = require("../../../services/user/session_model");
const logger = require("../../../../../config/logger");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
  let token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Token required",
    });
  }
  let secretOrKey = config.jwtSecret;
  try {
    var decoded = jwt.verify(token, secretOrKey);
    if (!ObjectId.isValid(decoded.id)) {
      throw new Error("Invalid Id");
    }
  } catch (err) {
    logger.error("In user authenticate: ");
    logger.error(err);
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Invalid or expired token",
    });
  }

  Session.findOne({
    user_id: decoded.id,
    token: token,
  })
    .populate("user_id")
    .then((user) => {
      if (user && user.user_id) {
        req.user = user.user_id;
        next();
      } else {
        logger.debug("Session not found");
        res.status(401).json({
          success: false,
          status: 401,
          message: "Invalid or expired token",
        });
      }
    })
    .catch((err) => {
      logger.debug("Error while populating user object");
      logger.error(err);
      next(err);
    });
};
