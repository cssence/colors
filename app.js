/*jslint nomen: true */
/*global console, require, __dirname */
(function (console, require, dirname) {
  "use strict";

  var nconf, path, app, data = {};

  // Module dependencies
  nconf = require("nconf");
  path = require("path");

  // Read configuration
  nconf.argv().env().file({file: path.join(dirname, "./package.json")}).defaults({
    "env": "development",
    "port": 8080
  });

  // Initialization
  app = require("express")();
  app.locals.basedir = dirname;
  app.set("port", nconf.get("port"));
  app.use(require("serve-static")(dirname));
  app.set("views", dirname);
  app.set("view engine", "jade");

  // Data requirements
  data.config = require(path.join(dirname, "./package.json"));
  data.colors = require(path.join(dirname, "./colors.json"));
  data.meta = require(path.join(dirname, "./description.json"));

  // Routes
  app.get("/", function (req, res) {
    res.render("colors", data);
  });
  app.get("/get", function (req, res) {
    res.json(data.colors);
  });
  app.use(function (req, res) {
    res.status(404).end();
  });

  // Http server
  require("http").createServer(app).listen(nconf.get("port"), function () {
    console.info("Express %s server listening on port %d", nconf.get("env"), nconf.get("port"));
  });
}(console, require, __dirname));
