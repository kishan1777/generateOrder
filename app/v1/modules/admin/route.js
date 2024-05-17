const controller = require("./controller");
const celebrate = require("celebrate").celebrate;
const validation = require("./validationSchema");
const authentication = require("./auth/authentication");

module.exports = (router) => {
  /**
   * @swagger
   * /api/v1/admin/signup:
   *   post:
   *     summary: Admin Signup
   *     description: Register a new admin
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
    "/admin/signup",
    celebrate(validation.sign_up),
    controller.admin_signup
  );

  /**
   * @swagger
   * /api/v1/admin/login:
   *   post:
   *     summary: admin login
   *     description: Login admin
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
    "/admin/login",
    celebrate(validation.login),
    controller.admin_login
  );

  /**
   * @swagger
   * /api/v1/admin/order:
   *   post:
   *     summary: admin add product
   *     description: admin add product
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
   *               name:
   *                   type: string
   *             required:
   *               - name
   *     responses:
   *       '200':
   *         success: true
   *         status: 200
   *         message: success
   *         data: product data
   *
   */
  router.post(
    "/admin/product",
    celebrate(validation.add_product),
    authentication,
    controller.add_product
  );

  /**
   * @swagger
   * /api/v1/admin/product/:product_id:
   *   delete:
   *     summary: admin remove product
   *     description: admin remove product
   *     parameters:
   *        - name: x-auth-token
   *          path: hearder
   *          description: Auth token recived after login
   *          schema:
   *            type: string
   *        - name: product_id
   *          in: path
   *          description: ID of the product to delete
   *          schema:
   *            type: string
   *     responses:
   *       '200':
   *          success: true,
   *          sttsus: 200,
   *          message: String,
   *
   */
  router.delete(
    "/admin/product/:product_id",
    authentication,
    controller.delete_product
  );

  /**
   * @swagger
   * /api/v1/admin/product:
   *   get:
   *     summary: admin get  product
   *     description: admin get product
   *     parameters:
   *        - name: x-auth-token
   *          path: hearder
   *          description: Auth token recived after login
   *          schema:
   *            type: string
   *        - name: name
   *          in: query
   *          description: name of product
   *          schema:
   *            type: string
   *     responses:
   *       '200':
   *          success: true,
   *          sttsus: 200,
   *          message: String,
   *          data: product data
   *
   */
  router.get("/admin/product", authentication, controller.list_product);

  /**
   * @swagger
   * /api/v1/admin/order:
   *   get:
   *     summary: admin get  product
   *     description: admin get product
   *     parameters:
   *        - name: x-auth-token
   *          path: hearder
   *          description: Auth token recived after login
   *          schema:
   *            type: string
   *     responses:
   *       '200':
   *          success: true,
   *          sttsus: 200,
   *          message: String,
   *          data: product data
   *
   */
  router.get("/admin/order", authentication, controller.list_order);
};
