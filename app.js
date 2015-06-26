/*jslint nomen: true */
/*global console, require, __dirname */
(function (console, require, dirname) {
  "use strict";

  var nconf, path, app, data = {};

  // Module dependencies
  nconf = require("nconf");
  path = require("path");
  data.colors = require(path.join(dirname, "/colors.json"));
  data.meta = require(path.join(dirname, "/description.json"));

  // Read configuration
  nconf.argv().env().file({file: path.join(dirname, "/settings.json")}).defaults({
    "env": "development",
    "port": 8080
  });

  // Initialization
  app = require("express")();
  app.locals.basedir = path.join(dirname, "/");
  app.set("port", nconf.get("port"));
  app.set("views", path.join(dirname, "/"));
  app.set("view engine", "jade");

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
