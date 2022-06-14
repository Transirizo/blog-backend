const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	res.json(blog);
});

blogsRouter.post("/", async (request, response) => {
	const body = request.body;
	if (body.title === undefined || body.url === undefined) {
		return response.status(400).json({
			error: "content missing",
		});
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	});

	const newBlog = await blog.save();
	response.status(201).json(newBlog);
	logger.info("have saved");
});

blogsRouter.delete("/:id", async (requset, response) => {
	await Blog.findByIdAndRemove(requset.params.id);
	response.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
	const findBlog = await Blog.findById(req.params.id);
	console.log(findBlog);
	const updateBlog = {
		title: findBlog.title,
		author: findBlog.author,
		url: findBlog.url,
		likes: findBlog.likes + 1,
	};
	console.log(updateBlog);
	const response = await Blog.findByIdAndUpdate(req.params.id, updateBlog, {
		new: true,
	});
	console.log(response);
	res.status(204).json(response);
});

module.exports = blogsRouter;
