const express = require("express"),
  glob = require("glob");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");
const env = require("../config/env");
let router = express.Router();
let swaggerJSDoc = require("swagger-jsdoc");

let options = {
  swaggerDefinition: {
    info: {
      title: "GenrateOrder APIs", // Title (required)
      version: "1.0.0", // Version (required)
      description: "API docs for Genrating Orders backend",
    },
    host: "http://localhost:4050/",
    basePath: "/api/v1",
  },
  apis: [`${__dirname}/v1/modules/**/route.js`],
};

const swaggerSpec = swaggerJSDoc(options);
router.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(swaggerSpec, null, 2));
});

if (env === "staging" || env === "development") {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

let controllers = glob.sync(`app/${config.app.webApi}/modules/**/route.js`);
controllers.forEach((controller) => {
  require(controller)(router);
});

module.exports = router;
