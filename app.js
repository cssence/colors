/*jslint nomen: true */
/*global console, require, __dirname */
(function (console, require, dirname) {
  "use strict";

  var path, fs, app, config = {}, data = {};

  // Module dependencies
  path = require("path");
  fs = require("fs");
  data.pkg = require(path.join(dirname, "package.json"));
  config.port = data.pkg.config.port || 8080;
  config.dist = data.pkg.config.paths.dist || "";
  config.serveStatic = {
    root: path.join(dirname, config.dist)
  };

  // Data requirements
  data.inline = {
    logo: fs.readFileSync(path.join(dirname, config.dist, "logo.svg"))
  };
  data.meta = require(path.join(dirname, config.dist, "description.json"));
  data.colors = require(path.join(dirname, config.dist, "colors.json"));

  // Initialization
  app = require("express")();
  app.locals.basedir = dirname;
  app.set("port", config.port);
  app.set("views", dirname);
  app.set("view engine", "jade");

  // Routes
  app.get("/", function (req, res) {
    res.render("colors", data);
  });
  app.get("/get", function (req, res) {
    res.json(data.colors);
  });
  app.get("/:file", function (req, res) {
    res.sendFile(req.params.file, config.serveStatic, function (err) {
      if (err) {
        res.status(err.status).end();
      }
    });
  });
  app.use(function (req, res) {
    res.status(404).end();
  });

  // Http server
  require("http").createServer(app).listen(config.port, function () {
    console.info("Express server listening on port %d", config.port);
  });
}(console, require, __dirname));
