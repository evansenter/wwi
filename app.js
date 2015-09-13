"use strict";

var express      = require("express");
var path         = require("path");
var favicon      = require("serve-favicon");
var logger       = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser   = require("body-parser");
var colors       = require("colors/safe");
var debug        = require("debug")("wwi:app");
var routes       = require("./routes/index");
var app          = express();

debug(colors.inverse("Running with NODE_ENV set as %s"), app.get("env"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/favicon.ico", function(req, res) {
  res.sendStatus(200);
});

app.use(logger("dev", {
  skip: function(req, res) {
    return req.path.search(/^\/(vendor|stylesheets|javascripts)\//) !== -1;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("stylus").middleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

app.use(function(req, res, next) {
  var err    = new Error("Not found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

module.exports = app;
