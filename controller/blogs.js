const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogsRouter.post("/", (request, response, next) => {
	const body = request.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});
	blog
		.save()
		.then((newBlog) => {
			response.json(newBlog);
		})
		.catch((error) => next(error));
	logger.info("have saved");
});

module.exports = blogsRouter;
