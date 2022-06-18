const blogsRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const logger = require("../utils/logger");
// const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");
blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1 });
	response.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate("user", {
		username: 1,
	});
	res.json(blog);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
	const body = request.body;

	// const decodedToken = jwt.verify(request.token, process.env.SECRET);

	// if (!decodedToken.id) {
	// 	response.status(401).json({
	// 		error: "token missing or invalid",
	// 	});
	// }
	const user = request.user;

	if (body.title === undefined || body.url === undefined) {
		return response.status(400).json({
			error: "title missing",
		});
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id,
	});

	const newBlog = await blog.save();
	user.blogs = user.blogs.concat(newBlog._id);
	await user.save();
	response.status(201).json(newBlog);
	logger.info("have saved");
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
	// const decodedToken = jwt.verify(request.token, process.env.SECRET);
	// if (!decodedToken.id) {
	// 	return response.status(401).json({
	// 		errror: "token invalid or missing",
	// 	});
	// }
	const userid = request.user._id;

	const blog = await Blog.findById(request.params.id);

	if (blog.user.toString() !== userid.toString()) {
		return response.status(401).json({
			error: "Not blog owner",
		});
	}

	await Blog.deleteOne(blog);

	response.status(204).end();
	logger.info("have deleted");
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
