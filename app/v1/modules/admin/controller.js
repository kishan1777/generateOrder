let controller = Object.create(null);

const logger = require("../../../../config/logger");
const { admin_signup, admin_login } = require("../../services/admin");
const {
  add_product,
  delete_product,
  list_product,
} = require("../../services/product");
const { list_order } = require("../../services/order");

controller.admin_signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const result = await admin_signup(email, name, password);
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

controller.admin_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await admin_login(email, password);
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
 * product contollers
 */

controller.add_product = async (req, res) => {
  try {
    let data = req.body;
    data.creator_id = req.admin._id;
    const result = await add_product(data);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while adding product controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

controller.delete_product = async (req, res) => {
  try {
    let product_id = req.params.product_id;
    const result = await delete_product(product_id, req.admin._id);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while removing product controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

controller.list_product = async (req, res) => {
  try {
    let query = req.query;
    query.creator_id = req.admin._id;
    const result = await list_product(query);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while listing product admin controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};

/**
 * order admin controller
 */
controller.list_order = async (req, res) => {
  try {
    let query = req.query;
    query.product_creator_id = req.admin._id;
    const result = await list_order(query);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while listing order admin controller");
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.toString(),
    });
  }
};
module.exports = controller;
