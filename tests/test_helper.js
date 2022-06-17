const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
	{
		title: "First",
		author: "Firstt",
		url: "URL1",
		likes: 1,
	},
	{
		title: "Second",
		author: "Secondd",
		url: "URL2",
		likes: 2,
	},
];

const BlogInDB = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const UserInDB = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = { initialBlogs, BlogInDB, UserInDB };
