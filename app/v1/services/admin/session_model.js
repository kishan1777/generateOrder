const mongoose = require("mongoose");
const logger = require("../../../../config/logger");

let sessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  token: [String],
});

// hooks
sessionSchema.pre("save", async (next) => {
  next();
});

// add session for an user
sessionSchema.statics.addSession = ({ id, token = "" }) => {
  AdminSession.updateOne(
    { user_id: id },
    { $push: { token } },
    { upsert: true }
  )
    .then((result) => {
      logger.debug("Created a session for user");
      logger.debug(JSON.stringify(result));
    })
    .catch((err) => {
      logger.error("Error while creating session for user");
      throw err;
    });
};

// remove one or more sessions for the user
sessionSchema.statics.removeSession = ({ id, token, removeAll = false }) => {
  let params = {};
  if (removeAll) {
    params = { $set: { token: [] } };
  } else {
    params = { $pull: { token } };
  }

  AdminSession.findOneAndUpdate({ user_id: id }, params, { upsert: true })
    .then((result) => result)
    .catch((err) => {
      throw err;
    });
};

let AdminSession = mongoose.model(
  "AdminSession",
  sessionSchema,
  "AdminSession"
);
module.exports = AdminSession;
