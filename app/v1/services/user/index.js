const logger = require("../../../../config/logger");
const User = require("./model");

const user_signup = async (email, name, password) => {
  try {
    let exist = await User.findOne({ email });
    if (exist) {
      return {
        success: false,
        status: 400,
        message: "This email already exist",
      };
    }

    let user = new User();
    let new_user = await User.create({
      name,
      email,
      password: user.generate_hash(password),
    });

    if (new_user) {
      return {
        success: true,
        status: 200,
        message: "User registered successfully ",
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

const user_login = async (email, password) => {
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not registered",
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
  user_signup,
  user_login,
};
