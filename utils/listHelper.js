const blog = require("../models/blog");
var _ = require("lodash");

const reverse = (string) => {
	return string.split("").reverse().join("");
};

const average = (array) => {
	const reducer = (sum, item) => {
		return sum + item;
	};
	return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};
	const likes = blogs.reduce(reducer, 0);
	return blogs.length === 1 ? blogs[0].likes : likes;
};

const favoriteBlog = (blogs) => {
	const reducer = (favorite, blog) => {
		return blog.likes >= favorite.likes ? blog : favorite;
	};
	const favorite = blogs.reduce(reducer, blogs[0]);
	console.log(favorite);
	const blog = {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
	return blog;
};

const mostBlogs = (blogs) => {
	const numOfBlogs = _.countBy(blogs, "author");
	// console.log(numOfBlogs);
	let most = { author: "nobody", blogs: 0 };
	_.forEach(numOfBlogs, (value, key) => {
		if (value >= most.blogs) {
			most.blogs = value;
			most.author = key;
		}
	});
	return most;
};

const mostLikes = (blogs) => {
	const numOfLikes = _.countBy(blogs);
};
module.exports = {
	reverse,
	average,
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
