const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

// 1. GLOBAL MIDDLEWARE

// Middleware bảo mật
app.use(helmet());

// Middleware log request
app.use(morgan("dev"));

// Middleware parse JSON
app.use(express.json());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// 3. ROUTES

module.exports = app;
