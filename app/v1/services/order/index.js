const Product = require("../product/model");
const Order = require("./model");
const logger = require("../../../../config/logger");

const create_order = async (orderData) => {
  try {
    let exist = await Product.findOne({ _id: orderData.product_id });

    if (!exist) {
      return {
        success: false,
        status: 404,
        message: "Product is not found with given id",
      };
    }
    orderData.product_creator_id = exist.creator_id;
    let order = await Order.create(orderData);
    return {
      success: true,
      status: 200,
      message: "Order created",
      product: await order.populate("product_id"),
    };
  } catch (error) {
    logger.error("Error in create order service");
    logger.error(error.message);
    throw error;
  }
};

const list_order = async (query) => {
  try {
    const page = query.page ? parseInt(query.page) : 1;
    let limit = query.limit ? parseInt(query.limit) : 10;
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder ? parseInt(query.sortOrder) : -1;

    const sortOptions = {
      [sortBy]: sortOrder,
    };

    let params = Object.create(null);
    if (query._id) {
      params["_id"] = query._id;
    }
    if (query.user_id) {
      params["user_id"] = query.user_id;
    }
    if (query.product_id) {
      params["product_id"] = query.product_id;
    }
    if (query.product_creator_id) {
      params["product_creator_id"] = query.product_creator_id;
    }
    const totalRecord = await Order.countDocuments(params);
    const orderData = await Order.find(params)
      .populate("product_id")
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      success: true,
      status: 200,
      message: "success",
      totalRecord: totalRecord,
      data: orderData,
      next_page: totalRecord > page * limit ? true : false,
    };
  } catch (error) {
    logger.error("Error while listing product service");
    throw error;
  }
};

module.exports = {
  create_order,
  list_order,
};
