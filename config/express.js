const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("./logger");
//const session = require("express-session");

module.exports = function (app, config) {
  // set up environment for the application
  let env = require("./env");
  app.locals.ENV = env;
  app.locals.env = env;
  app.locals.ENV_DEVELOPMENT = env === "development";
  app.set("env", env);

  // set up logger
  app.use(morgan("dev", { stream: logger.stream }));
  // setup body parser and cookie parser
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());

  // load routers
  app.use(`/api/${config.app.webApi}`, require("../app/mainRouter"));

  //The 404 Route (ALWAYS Keep this as the last route)
  app.all("*", (req, res) => {
    res.status(404).json({
      success: false,
      error: "No such API exists",
    });
  });
};
