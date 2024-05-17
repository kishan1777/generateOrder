let env = process.env.NODE_ENV;

if (!env) {
  env = "development";
}

module.exports = env;
