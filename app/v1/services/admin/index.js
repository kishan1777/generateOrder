const logger = require("../../../../config/logger");
const Admin = require("./model");

const admin_signup = async (email, name, password) => {
  try {
    let exist = await Admin.findOne({ email });
    if (exist) {
      return {
        success: false,
        status: 400,
        message: "This email already exist",
      };
    }

    let user = new Admin();
    let new_user = await Admin.create({
      name,
      email,
      password: user.generate_hash(password),
    });

    if (new_user) {
      return {
        success: true,
        status: 200,
        message: "Admin registered successfully ",
      };
    }

    return {
      success: false,
      status: 400,
      message: "Something went worng",
    };
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const admin_login = async (email, password) => {
  try {
    let user = await Admin.findOne({ email });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "Admin not registered",
      };
    }

    if (!user.valid_password(password)) {
      return {
        success: false,
        status: 400,
        message: "Invalid credentials",
      };
    }
    let token = await user.gen_auth_token();
    return {
      success: true,
      status: 200,
      message: "Login success",
      token: token,
    };
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = {
  admin_signup,
  admin_login,
};
