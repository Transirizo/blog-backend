const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (req, res, next) => {
	logger.info("Method:", req.method);
	logger.info("Path: ", req.path);
	logger.info("Body: ", req.body);
	logger.info("---");
	next();
};

const unknownEndPoint = (req, res, next) => {
	res.status(404).send({
		error: "unknown endpoint",
	});

	next();
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		req.token = authorization.substring(7);
	} else {
		req.token = null;
	}
	next();
};

const userExtractor = async (req, res, next) => {
	if (req.token) {
		const token = req.token;
		const decodedToken = jwt.verify(token, process.env.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({
				errror: "token invalid or missing",
			});
		}
		const user = await User.findById(decodedToken.id);
		req.user = user;
	}

	next();
};

const errorHandler = (error, req, res, next) => {
	console.error(error.message);
	if (error.name === "CastError") {
		return res.status(400).send({
			error: "malformatted id",
		});
	} else if (error.name === "ValidationError") {
		return res.status(400).json({
			error: error.message,
		});
	} else if (error.name === "invalid token") {
		return res.status(401).json({
			error: "invalid token",
		});
	} else if (error.name === "TokenExpiredError") {
		return res.status(401).json({
			error: "token expired",
		});
	}
	next(error);
};

module.exports = {
	requestLogger,
	unknownEndPoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
