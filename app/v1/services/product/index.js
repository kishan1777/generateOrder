const logger = require("../../../../config/logger");
const Product = require("./model");

const add_product = async (productData) => {
  try {
    let product = await Product.create(productData);
    return {
      success: true,
      status: 200,
      message: "Product added",
      product: product,
    };
  } catch (error) {
    logger.error("Error in product add service");
    throw error;
  }
};

const list_product = async (query) => {
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
    if (query.creator_id) {
      params["creator_id"] = query.creator_id;
    }
    if (query.name) {
      params["name"] = query.name;
    }
    const totalRecord = await Product.countDocuments(params);
    const productData = await Product.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      success: true,
      status: 200,
      message: "Success",
      totalRecord: totalRecord,
      data: productData,
      next_page: totalRecord > page * limit ? true : false,
    };
  } catch (error) {
    logger.error("Error while listing product service");
    throw error;
  }
};

const delete_product = async (product_id, creator_id) => {
  try {
    let product = await Product.findOne({ _id: product_id, creator_id });
    if (!product) {
      return {
        success: false,
        status: 404,
        message: "Book not found with given id",
      };
    }

    await Product.findOneAndDelete({ _id: product_id });
    return {
      success: true,
      status: 200,
      message: "Deleted successfully",
    };
  } catch (error) {
    logger.error("Error while removing product service");
    throw error;
  }
};

module.exports = {
  add_product,
  list_product,
  delete_product,
};
