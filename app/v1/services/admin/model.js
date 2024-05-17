const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../../../../config");
const Session = require("./session_model");
const logger = require("../../../../config/logger");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

/**
 * Utility methods
 */

// hash the password
adminSchema.methods.generate_hash = function generate_hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
adminSchema.methods.valid_password = function valid_password(password) {
  return bcrypt.compareSync(password, this.password);
};

// generate a jwt token and save inside session
adminSchema.methods.gen_auth_token = async function gen_auth_token() {
  try {
    const payload = { id: this._id };
    var token = jwt.sign(payload, config.jwtSecret);
  } catch (error) {
    logger.error(error);
    throw error;
  }
  await Session.addSession({ token, id: this._id });
  return token;
};

const Admin = mongoose.model("Admin", adminSchema, "Admin");
module.exports = Admin;
