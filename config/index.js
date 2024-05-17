const path = require("path");
let rootPath = path.normalize(`${__dirname}/..`);
const env = require("./env");

const config = {
  root: rootPath,
  development: {
    app: {
      name: "genrateOrderBackend",
      domain: "http://localhost:4050",
      webApi: "v1",
    },
    jwtSecret: process.env.jwt_secret || "test_secret",
    port: process.env.PORT || 4050,
    db: process.env.db || "mongodb://localhost:27017/genrateOrder_db_dev",
    dbName: "genrateOrder_db_dev",
  },
};

module.exports = config[`${env}`];
