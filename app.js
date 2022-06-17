const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-error");

const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");

const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");

const middleware = require("./utils/middleware");
mongoose
	.connect(config.MONGODB_URL)
	.then(() => {
		logger.info("connectd to MongoDB");
	})
	.catch((error) => {
		logger.error(error);
	});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
