let controller = Object.create(null);

const logger = require("../../../../config/logger");
const { user_signup, user_login } = require("../../services/user");
const { list_product } = require("../../services/product");
const { create_order, list_order } = require("../../services/order");

controller.user_signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await user_signup(email, name, password);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while creating user");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

controller.user_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user_login(email, password);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while login user");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

/**
 *
 * user product controller
 */
controller.list_product = async (req, res) => {
  try {
    let query = req.query;
    const result = await list_product(query);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while listing product user controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

/**
 *
 * user order controller.
 */

controller.order_product = async (req, res) => {
  try {
    let orderData = {};
    orderData.product_id = req.body.product_id;
    orderData.user_id = req.user._id;
    const result = await create_order(orderData);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while order product user controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

controller.list_order = async (req, res) => {
  try {
    let query = req.query;
    query.user_id = req.user._id;
    const result = await list_order(query);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while listing order user controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

module.exports = controller;
