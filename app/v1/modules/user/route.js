const controller = require("./controller");
const celebrate = require("celebrate").celebrate;
const validation = require("./validationSchema");
const authentication = require("./auth/authentication");

module.exports = (router) => {
  /**
   * @swagger
   * /api/v1/user/signup:
   *   post:
   *     summary: User Signup
   *     description: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - name
   *               - email
   *               - password
   *     responses:
   *       '200':
   *         description: Success
   */
  router.post(
    "/user/signup",
    celebrate(validation.sign_up),
    controller.user_signup
  );

  /**
   * @swagger
   * /api/v1/user/login:
   *   post:
   *     summary: User login
   *     description: Login user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *     responses:
   *       '200':
   *         success: true
   *         status: 200
   *         message: success
   *         token: jwt token
   *       '404':
   *         success: false
   *         status: 404
   *         message: User not registered
   *
   */
  router.post(
    "/user/login",
    celebrate(validation.login),
    controller.user_login
  );

  /**
   * @swagger
   * /api/v1/user/product:
   *   get:
   *     summary: User get product
   *     description: user get product
   *     parameters:
   *        - name: x-auth-token
   *          path: hearder
   *          description: Auth token recived after login
   *          schema:
   *            type: string
   *     requestBody:
   *     responses:
   *       '200':
   *         success: true
   *         status: 200
   *         message: success
   *         data: product data
   *
   */
  router.get("/user/product", authentication, controller.list_product);

  /**
   * @swagger
   * /api/v1/user/order:
   *   post:
   *     summary: User add order
   *     description: user order product
   *     parameters:
   *        - name: x-auth-token
   *          path: hearder
   *          description: Auth token recived after login
   *          schema:
   *            type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               product_id:
   *                    type: string
   *             required:
   *               - product_id
   *     responses:
   *       '200':
   *         success: true
   *         status: 200
   *         message: success
   *         data: order data
   *
   */
  router.post(
    "/user/order",
    celebrate(validation.order_product),
    authentication,
    controller.order_product
  );

  /**
   * @swagger
   * /api/v1/user/order:
   *   get:
   *     summary: User get order
   *     description: user get order
   *     parameters:
   *        - name: x-auth-token
   *          path: hearder
   *          description: Auth token recived after login
   *          schema:
   *            type: string
   *        - name: _id
   *          path: query
   *          description: id of the order
   *          schema:
   *             type: string
   *        - name: product_id
   *          path: query
   *          description: id of the product
   *          schema:
   *             type: string
   *     responses:
   *       '200':
   *         success: true
   *         status: 200
   *         message: success
   *         data: order data
   *
   */
  router.get("/user/order", authentication, controller.list_order);
};
