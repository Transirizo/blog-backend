const logger = require("./logger");

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
	console.log(authorization);
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		res.locals.token = authorization.substring(7);
	} else {
		res.locals.token = null;
	}

	next();
};

const errorHandler = (error, req, res, next) => {
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
};
